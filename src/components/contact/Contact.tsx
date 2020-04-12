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
    Answer(transl.devsAreAssholes, Message(transl.butICant)),
    Answer(
      transl.devsAreAwesome,
      Question(
        transl.whatElse,
        Answer(transl.congrats),
        Answer(transl.congratsSonOfABitch, FreeMsg())
      )
    ),
    Answer(
      transl.iWannaSuggestScene,
      Question(
        transl.whichCharacter,
        Answer(
          'Jean Plank',
          FreeMsg(
            <Fragment>
              {transl.jpNoNeedToIntroduceMe}
              <br />
              <br />
              {transl.sceneDescription}
            </Fragment>
          )
        ),
        Answer(transl.luchien, FreeMsg(transl.sceneDescription)),
        Answer(transl.mf, FreeMsg(transl.sceneDescription)),
        Answer(transl.stGede, FreeMsg(transl.sceneDescription)),
        Answer(
          transl.haddock,
          FreeMsg(
            <Fragment>
              {transl.haddockTintin}
              <br />
              <br />
              {transl.sceneDescription}
            </Fragment>
          )
        ),
        Answer(transl.kaarthus, FreeMsg(transl.sceneDescription)),
        Answer(
          transl.rammus,
          FreeMsg(
            <Fragment>
              {transl.rammusOk}
              <br />
              <br />
              {transl.sceneDescription}
            </Fragment>
          )
        ),
        Answer(transl.pikachu, FreeMsg(transl.sceneDescription)),
        Answer(transl.otherWithPrecision, FreeMsg(transl.sceneDescription))
      )
    ),
    Answer(transl.iAmATalentedMusician, FreeMsg(transl.giveUsYourContact)),
    Answer(
      transl.iAmShocked,
      Question(
        transl.why,
        Answer(
          transl.itsRacist,
          Question(
            transl.forWho,
            Answer(transl.niggers, Link('http://le-cran.fr')),
            Answer(transl.chineses, MessageLink('https://t.co/zh0cyds07K', transl.itCouldBeWorse)),
            Answer(
              transl.vikings,
              Link(
                'http://www.jeuxvideo.com/forums/1-51-42348195-1-0-1-0-le-racisme-anti-viking.htm'
              )
            ),
            Answer(transl.pirates),
            Answer(transl.niggers),
            Answer(transl.aLotOfPeople)
          )
        ),
        Answer(transl.itsSexist),
        Answer(transl.itsHomo),
        Answer(transl.itsReligonUnfriendly),
        Answer(transl.itsPedophile),
        Answer(transl.itsTerroristic, Link('https://twitter.com/Gendarmerie')),
        Answer(transl.itsNotFunny, Link('https://youtu.be/psCSnnioq0M')),
        Answer(transl.noneOfThis, FreeMsg())
      )
    ),
    Answer(
      transl.technicalProblem,
      Question(
        transl.whichOne,
        Answer(
          transl.onelineVersionDoesntWork,
          Message(
            <Fragment>
              {transl.blameYourself}
              <br />
              <br />
              {transl.andDownloadTheGame}
            </Fragment>
          )
        ),
        Answer(transl.imLeftHanded, Message(transl.trueIndeed)),
        Answer(transl.needMoarOars, Link('https://downloadmoreram.com'))
      )
    ),
    Answer(transl.mySuggestionIsSoAwesome, FreeMsg(transl.ohWell))
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
