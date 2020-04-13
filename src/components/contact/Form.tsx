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

interface Props {
  onSubmit: () => void
}

export const Form: FunctionComponent<Props> = ({ onSubmit }) => {
  const transl = useContext(AppContext).translation

  const [selected, setSelected] = useState<ArrayWithEnd<Answer, EndOutput>>(O.none)
  const [freeMsg, setFreeMsg] = useState<Option<string>>(O.none)

  const disabled =
    O.isNone(selected) || lastIsQuestionOrMessage() || (lastIsFreeMsg() && freeMsgIsEmpty())

  return (
    <Fragment>
      <div css={styles.selects}>
        <Selects
          selected={selected}
          setSelected={setSelected}
          question={question(transl.contact.form)}
        />
        {pipe(
          ArrayWithEnd.last(selected),
          O.filter(EndOutput.isDisplayable),
          O.fold(
            () => null,
            _ => <FormOutcome end={_} freeMsg={freeMsg} setFreeMsg={setFreeMsg} />
          )
        )}
      </div>

      <Buttons.Primary disabled={disabled} onClick={submitForm}>
        {transl.contact.send}
      </Buttons.Primary>
    </Fragment>
  )

  function lastIsFreeMsg(): boolean {
    return pipe(
      ArrayWithEnd.lastA(selected),
      O.chain(_ => _.leadsTo),
      O.exists(AnswerNext.isFreeMsg)
    )
  }

  function freeMsgIsEmpty(): boolean {
    return pipe(
      freeMsg,
      O.fold(
        () => true,
        _ => _.trim() === ''
      )
    )
  }

  function lastIsQuestionOrMessage(): boolean {
    return pipe(
      ArrayWithEnd.lastA(selected),
      O.chain(_ => _.leadsTo),
      O.exists(
        _ => AnswerNext.isQuestion(_) || AnswerNext.isMessage(_) || AnswerNext.isMessageLink(_)
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
            ...answers.map(_ => _.label),
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
  selects: css({
    width: '100%'
  })
}
