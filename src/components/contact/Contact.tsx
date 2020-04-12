/** @jsx jsx */
import * as O from 'fp-ts/lib/Option'
import { css, jsx } from '@emotion/core'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { Option } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { FunctionComponent, useContext, useState, Fragment } from 'react'

import bgNotFoundJpg from '../../../img/bg_not_found.jpg'

import { ContactEnd } from './ContactEnd'
import { ContactSelect } from './ContactSelect'
import AppContext from '../../contexts/AppContext'
import { FormTranslation } from '../../contexts/translation'
import { ArrayWithEnd } from '../../models/ArrayWithEnd'
import {
  Question,
  Answer,
  FreeMsg,
  Message,
  Link,
  EndOutput,
  AnswerNext,
  MessageLink
} from '../../models/choices'
import { fontFamily } from '../../utils/css/fonts'

export const Contact: FunctionComponent = () => {
  const transl = useContext(AppContext).translation

  const [selected, setSelected] = useState<ArrayWithEnd<Answer, EndOutput>>(O.none)
  const [freeMsg, setFreeMsg] = useState<Option<string>>(O.none)

  const disabled =
    O.isNone(selected) ||
    pipe(
      ArrayWithEnd.lastA(selected),
      O.chain(_ => _.leadsTo),
      O.exists(
        _ => AnswerNext.isQuestion(_) || AnswerNext.isMessage(_) || AnswerNext.isMessageLink(_)
      )
    )

  return (
    <div css={styles.contact}>
      <div css={styles.container}>
        <div css={styles.form}>
          <div css={styles.selects}>
            <ContactSelect
              selected={selected}
              setSelected={setSelected}
              question={question(transl.contact.form)}
            />
            {pipe(
              selected,
              O.chain(([, _]) => _),
              O.filter(EndOutput.isDisplayable),
              O.fold(
                () => null,
                _ => <ContactEnd end={_} freeMsg={freeMsg} setFreeMsg={setFreeMsg} />
              )
            )}
          </div>

          <button disabled={disabled} onClick={submitForm} css={styles.sendBtn}>
            {transl.contact.send}
          </button>
        </div>
      </div>
    </div>
  )

  function submitForm() {
    pipe(
      selected,
      O.map(([_1, _2]) => submitFormEndOpt(_1, _2))
    )
  }

  function submitFormEndOpt(answers: NonEmptyArray<Answer>, end: Option<EndOutput>) {
    pipe(
      end,
      O.fold(
        () => send(answers),
        end => {
          switch (end._tag) {
            case 'Link':
              const win = window.open(end.value, '_blank')
              if (win !== null) {
                win.opener = null
                win.focus()
              }
              break

            case 'FreeMsg':
              send(answers, freeMsg)
              break
          }
        }
      )
    )
  }

  function send(answers: NonEmptyArray<Answer>, msg: Option<string> = O.none) {
    // TODO: send answers and freeMsg
    console.table(answers.map(_ => _.label))
    O.option.map(msg, console.log)
  }
}

const question = (transl: FormTranslation) =>
  Question(
    transl.whatDoYouWant,
    Answer(
      'Les développeurs sont des enculés et je veux envoyer un message de haine',
      Message('Mais je ne peux pas.')
    ),
    Answer(
      'Les développeurs sont formidables et je veux les féliciter',
      Question('Mais encore ?', Answer('Bravo.'), Answer('Bravo, fils de pute.', FreeMsg()))
    ),
    Answer(
      'Je veux proposer une scène (qui ne finira pas dans le jeu, mais ça me fait plaisir)',
      Question(
        'Avec quel personnage ?',
        Answer(
          'Jean Plank',
          FreeMsg(
            <Fragment>
              "Ha, ha ! Inutile de me présenter !"
              <br />
              <br />
              Description de la scène :
            </Fragment>
          )
        ),
        Answer('Luchien', FreeMsg('Description de la scène :')),
        Answer('Miss Fourtune', FreeMsg('Description de la scène :')),
        Answer('Saint Gède', FreeMsg('Description de la scène :')),
        Answer(
          'Haddock',
          FreeMsg(
            <Fragment>
              "TINTIN ?!"
              <br />
              <br />
              Description de la scène :
            </Fragment>
          )
        ),
        Answer('Kaarthus', FreeMsg('Description de la scène :')),
        Answer(
          'Rammus',
          FreeMsg(
            <Fragment>
              "OK."
              <br />
              <br />
              Description de la scène :
            </Fragment>
          )
        ),
        Answer('Pikachu', FreeMsg('Description de la scène :')),
        Answer('Autre (préciser)', FreeMsg('Description de la scène :'))
      )
    ),
    Answer(
      "Je suis un musicien compétent et je souhaite intégrer l'équipe de dev'",
      FreeMsg('Laisse nous un moyen de te contacter 😉')
    ),
    Answer(
      'Je suis outré par le contenu de ce jeu formidable et je veux le faire savoir',
      Question(
        'Pourquoi donc ?',
        Answer(
          "C'est raciste",
          Question(
            'Envers qui ?',
            Answer('Les noirs', Link('http://le-cran.fr')),
            Answer('Les chinois', MessageLink('https://t.co/zh0cyds07K', 'Ça va, il y a pire...')),
            Answer(
              'Les vikings',
              Link(
                'http://www.jeuxvideo.com/forums/1-51-42348195-1-0-1-0-le-racisme-anti-viking.htm'
              )
            ),
            Answer('Les pirates'),
            Answer('Les noirs'),
            Answer('Beaucoup trop de monde')
          )
        ),
        Answer("C'est sexiste"),
        Answer("C'est homophobe"),
        Answer("C'est dégradant envers la religion"),
        Answer("Ça contient de la pédophilie (À PEINE DISSIMULÉE) et je n'aime pas ça"),
        Answer("Ça fait l'apologie du terrorisme", Link('https://twitter.com/Gendarmerie')),
        Answer("C'est pas drôle, fils de pute", Link('https://youtu.be/psCSnnioq0M')),
        Answer('Rien de tout cela', FreeMsg())
      )
    ),
    Answer(
      "J'ai rencontré un problème technique",
      Question(
        'Lequel ?',
        Answer(
          "Un truc ne marche pas sur la version en ligne alors qu'on m'a dit qu'elle n'était pas stable et je ne peux m'en prendre qu'à moi-même",
          Message(
            <Fragment>
              Ne t'en prends qu'à toi même.
              <br />
              <br />
              (Et télécharge le jeu.)
            </Fragment>
          )
        ),
        Answer('En fait, je suis gaucher', Message('Aucun doute, il disait vrai.')),
        Answer(
          "Je n'ai pas assez de RAM - il me faut plus de rames",
          Link('https://downloadmoreram.com')
        )
      )
    ),
    Answer(
      "Ma recommandation est si intéressante qu'elle ne figure pas dans les choix sus-mentionnés",
      FreeMsg('Eh ben...')
    )
  )

const styles = {
  contact: css({
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    paddingTop: '2.1em',
    background: `url('${bgNotFoundJpg}')`,
    backgroundSize: 'cover'
  }),

  container: css({
    border: '10px double #b59458',
    color: 'black',
    width: 'calc(100% - 2em)',
    maxWidth: '1400px',
    minHeight: '70%',
    display: 'flex',
    alignItems: 'stretch',
    fontFamily: fontFamily.baloopaaji2,
    letterSpacing: '-1px',
    fontSize: '0.8em'
  }),

  form: css({
    backgroundColor: '#f6f0cd',
    width: '100%',
    padding: '1em 1em 0.67em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between'
  }),

  selects: css({
    width: '100%'
  }),

  sendBtn: css({
    fontFamily: 'inherit',
    fontSize: '0.8em',
    padding: '0 0.5em',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    transition: 'all 0.3s',

    '&:not([disabled])': {
      cursor: 'pointer',
      backgroundColor: '#b59458',
      color: '#f6f0cd',
      border: '4px solid #b59458',
      boxShadow: '0 0 8px -4px black'
    },

    '&[disabled]': {
      backgroundColor: '#e9e1c1',
      color: '#aeab9a',
      border: '4px solid #d7cc9e'
    },

    '&::after': {
      content: `''`,
      position: 'absolute',
      bottom: '0.2em',
      left: '0.5em',
      width: 'calc(100% - 1em)',
      border: '1px solid #f6f0cd',
      borderWidth: '1px 0',
      borderRadius: '50%',
      opacity: 0,
      transition: 'all 0.3s'
    },

    '&:not([disabled]):hover::after': {
      opacity: 1
    }
  })
}
