/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FunctionComponent, useContext, useState, Fragment } from 'react'

import { Maybe, pipe, NonEmptyArray, Future } from 'main-site-shared/lib/fp'
import { FormPayload } from 'main-site-shared/lib/models/form/FormPayload'

import { Buttons } from './Buttons'
import { Selects } from './Selects'
import { FormOutcome } from './FormOutcome'
import { AppContext } from '../../contexts/AppContext'
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

  const [selected, setSelected] = useState<ArrayWithEnd<Answer, EndOutput>>(Maybe.none)
  const [freeMsg, setFreeMsg] = useState<Maybe<string>>(Maybe.none)

  const enabled = lastAnswerLeadsToNone() || (lastAnswerLeadsToFreeMsg() && freeMsgIsDefined())

  return (
    <Fragment>
      <div css={styles.selects}>
        <Selects selected={selected} setSelected={setSelected} question={question} />
        {pipe(
          ArrayWithEnd.last(selected),
          Maybe.filter(EndOutput.isDisplayable),
          Maybe.fold(
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
      Maybe.fold(
        () => false,
        _ => Maybe.isNone(_.leadsTo)
      )
    )
  }

  function lastAnswerLeadsToFreeMsg(): boolean {
    return pipe(
      ArrayWithEnd.lastA(selected),
      Maybe.chain(_ => _.leadsTo),
      Maybe.exists(AnswerNext.isFreeMsg)
    )
  }

  function freeMsgIsDefined(): boolean {
    return pipe(
      freeMsg,
      Maybe.fold(
        () => false,
        _ => _.trim() !== ''
      )
    )
  }

  function submitForm() {
    pipe(
      selected,
      Maybe.map(_ => submitFormEndOpt(_.init, _.last))
    )
  }

  function submitFormEndOpt(answers: NonEmptyArray<Answer>, end: Maybe<EndOutput>) {
    pipe(
      end,
      Maybe.fold(
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

  function send(answers: NonEmptyArray<Answer>, freeMsg: Maybe<string> = Maybe.none) {
    const payload = FormPayload.codec.encode({
      answers: pipe(
        answers,
        NonEmptyArray.map(_ => _.value)
      ),
      freeMsg
    })
    pipe(
      Future.unit,
      Future.map(_ => {
        // TODO: send payload
        console.log(JSON.stringify(payload, null, 2))
      }),
      Future.map(_ => onSubmit()),
      Future.runUnsafe
    )
  }
}

const question = Question(
  _ => _.whatDoYouWant,
  Answer(
    'devsAreAssholes',
    Message(_ => _.butICant)
  ),
  Answer(
    'devsAreAwesome',
    Question(_ => _.whatElse, Answer('congrats'), Answer('congratsSonOfABitch', FreeMsg()))
  ),
  Answer(
    'iWannaSuggestScene',
    Question(
      _ => _.whichCharacter,
      Answer(
        'jp',
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
        'luchien',
        FreeMsg(_ => _.sceneDescription)
      ),
      Answer(
        'mf',
        FreeMsg(_ => _.sceneDescription)
      ),
      Answer(
        'stGede',
        FreeMsg(_ => _.sceneDescription)
      ),
      Answer(
        'haddock',
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
        'kaarthus',
        FreeMsg(_ => _.sceneDescription)
      ),
      Answer(
        'rammus',
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
        'pikachu',
        FreeMsg(_ => _.sceneDescription)
      ),
      Answer(
        'otherWithPrecision',
        FreeMsg(_ => _.sceneDescription)
      )
    )
  ),
  Answer(
    'iAmATalentedMusician',
    FreeMsg(_ => _.giveUsYourContact)
  ),
  Answer(
    'iAmShocked',
    Question(
      _ => _.why,
      Answer(
        'itsRacist',
        Question(
          _ => _.forWho,
          Answer('niggers', Link('http://le-cran.fr')),
          Answer(
            'chineses',
            MessageLink('https://t.co/zh0cyds07K', _ => _.itCouldBeWorse)
          ),
          Answer(
            'vikings',
            Link('http://www.jeuxvideo.com/forums/1-51-42348195-1-0-1-0-le-racisme-anti-viking.htm')
          ),
          Answer('pirates'),
          Answer('niggers'),
          Answer('aLotOfPeople')
        )
      ),
      Answer('itsSexist'),
      Answer('itsHomo'),
      Answer('itsReligonUnfriendly'),
      Answer('itsPedophile'),
      Answer('itsTerroristic', Link('https://twitter.com/Gendarmerie')),
      Answer('itsNotFunny', Link('https://youtu.be/psCSnnioq0M')),
      Answer('noneOfThis', FreeMsg())
    )
  ),
  Answer(
    'technicalProblem',
    Question(
      _ => _.whichOne,
      Answer(
        'onlineVersionDoesntWork',
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
        'imLeftHanded',
        Message(_ => _.trueIndeed)
      ),
      Answer('needMoarOars', Link('https://downloadmoreram.com'))
    )
  ),
  Answer(
    'mySuggestionIsSoAwesome',
    FreeMsg(_ => _.ohWell)
  )
)

const styles = {
  selects: css({
    width: '100%'
  })
}
