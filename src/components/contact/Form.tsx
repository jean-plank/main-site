/** @jsx jsx */
import * as O from 'fp-ts/lib/Option'
import * as T from 'fp-ts/lib/Task'
import { css, jsx } from '@emotion/core'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { Option } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { FunctionComponent, useContext, useState, Fragment } from 'react'

import { Buttons } from './Buttons'
import { Selects } from './Selects'
import { FormOutcome } from './FormOutcome'
import { AppContext } from '../../contexts/AppContext'
import { translations } from '../../contexts/translation'
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
} from '../../models/form'

interface Props {
  onSubmit: () => void
}

export const Form: FunctionComponent<Props> = ({ onSubmit }) => {
  const transl = useContext(AppContext).translation

  const [selected, setSelected] = useState<ArrayWithEnd<Answer, EndOutput>>(O.none)
  const [freeMsg, setFreeMsg] = useState<Option<string>>(O.none)

  const enabled = lastAnswerLeadsToNone() || (lastAnswerLeadsToFreeMsg() && freeMsgIsDefined())

  return (
    <Fragment>
      <div css={styles.selects}>
        <Selects selected={selected} setSelected={setSelected} question={question} />
        {pipe(
          ArrayWithEnd.last(selected),
          O.filter(EndOutput.isDisplayable),
          O.fold(
            () => null,
            _ => <FormOutcome end={_} freeMsg={freeMsg} setFreeMsg={setFreeMsg} />
          )
        )}
      </div>

      <Buttons.Primary disabled={!enabled} onClick={submitForm}>
        {transl.contact.send}
      </Buttons.Primary>
    </Fragment>
  )

  function lastAnswerLeadsToNone(): boolean {
    return pipe(
      ArrayWithEnd.lastA(selected),
      O.fold(
        () => false,
        _ => O.isNone(_.leadsTo)
      )
    )
  }

  function lastAnswerLeadsToFreeMsg(): boolean {
    return pipe(
      ArrayWithEnd.lastA(selected),
      O.chain(_ => _.leadsTo),
      O.exists(AnswerNext.isFreeMsg)
    )
  }

  function freeMsgIsDefined(): boolean {
    return pipe(
      freeMsg,
      O.fold(
        () => false,
        _ => _.trim() !== ''
      )
    )
  }

  function submitForm() {
    pipe(
      selected,
      O.map(_ => submitFormEndOpt(_.init, _.last))
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
    pipe(
      T.of(
        (() => {
          const formatted = [
            ...answers.map(_ => _.label(translations.fr.contact.form)),
            ...pipe(
              msg,
              O.map(_ => _.trim()),
              O.filter(_ => _ !== ''),
              O.fold(
                () => [],
                _ => ['---', _]
              )
            )
          ].join('\n')
          // TODO: send answers and freeMsg
          console.log(formatted)
        })()
      ),
      T.map(_ => onSubmit())
    )()
  }
}

const question = Question(
  _ => _.whatDoYouWant,
  Answer(
    _ => _.devsAreAssholes,
    Message(_ => _.butICant)
  ),
  Answer(
    _ => _.devsAreAwesome,
    Question(
      _ => _.whatElse,
      Answer(_ => _.congrats),
      Answer(_ => _.congratsSonOfABitch, FreeMsg())
    )
  ),
  Answer(
    _ => _.iWannaSuggestScene,
    Question(
      _ => _.whichCharacter,
      Answer(
        _ => 'Jean Plank',
        FreeMsg(_ => (
          <Fragment>
            {_.jpNoNeedToIntroduceMe}
            <br />
            <br />
            {_.sceneDescription}
          </Fragment>
        ))
      ),
      Answer(
        _ => _.luchien,
        FreeMsg(_ => _.sceneDescription)
      ),
      Answer(
        _ => _.mf,
        FreeMsg(_ => _.sceneDescription)
      ),
      Answer(
        _ => _.stGede,
        FreeMsg(_ => _.sceneDescription)
      ),
      Answer(
        _ => _.haddock,
        FreeMsg(_ => (
          <Fragment>
            {_.haddockTintin}
            <br />
            <br />
            {_.sceneDescription}
          </Fragment>
        ))
      ),
      Answer(
        _ => _.kaarthus,
        FreeMsg(_ => _.sceneDescription)
      ),
      Answer(
        _ => _.rammus,
        FreeMsg(_ => (
          <Fragment>
            {_.rammusOk}
            <br />
            <br />
            {_.sceneDescription}
          </Fragment>
        ))
      ),
      Answer(
        _ => _.pikachu,
        FreeMsg(_ => _.sceneDescription)
      ),
      Answer(
        _ => _.otherWithPrecision,
        FreeMsg(_ => _.sceneDescription)
      )
    )
  ),
  Answer(
    _ => _.iAmATalentedMusician,
    FreeMsg(_ => _.giveUsYourContact)
  ),
  Answer(
    _ => _.iAmShocked,
    Question(
      _ => _.why,
      Answer(
        _ => _.itsRacist,
        Question(
          _ => _.forWho,
          Answer(_ => _.niggers, Link('http://le-cran.fr')),
          Answer(
            _ => _.chineses,
            MessageLink('https://t.co/zh0cyds07K', _ => _.itCouldBeWorse)
          ),
          Answer(
            _ => _.vikings,
            Link('http://www.jeuxvideo.com/forums/1-51-42348195-1-0-1-0-le-racisme-anti-viking.htm')
          ),
          Answer(_ => _.pirates),
          Answer(_ => _.niggers),
          Answer(_ => _.aLotOfPeople)
        )
      ),
      Answer(_ => _.itsSexist),
      Answer(_ => _.itsHomo),
      Answer(_ => _.itsReligonUnfriendly),
      Answer(_ => _.itsPedophile),
      Answer(_ => _.itsTerroristic, Link('https://twitter.com/Gendarmerie')),
      Answer(_ => _.itsNotFunny, Link('https://youtu.be/psCSnnioq0M')),
      Answer(_ => _.noneOfThis, FreeMsg())
    )
  ),
  Answer(
    _ => _.technicalProblem,
    Question(
      _ => _.whichOne,
      Answer(
        _ => _.onelineVersionDoesntWork,
        Message(_ => (
          <Fragment>
            {_.blameYourself}
            <br />
            <br />
            {_.andDownloadTheGame}
          </Fragment>
        ))
      ),
      Answer(
        _ => _.imLeftHanded,
        Message(_ => _.trueIndeed)
      ),
      Answer(_ => _.needMoarOars, Link('https://downloadmoreram.com'))
    )
  ),
  Answer(
    _ => _.mySuggestionIsSoAwesome,
    FreeMsg(_ => _.ohWell)
  )
)

const styles = {
  selects: css({
    width: '100%'
  })
}
