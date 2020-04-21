/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FunctionComponent, ReactNode, useContext, useState, Fragment } from 'react'

import { Maybe, pipe, NonEmptyArray, Future, IO } from 'main-site-shared/lib/fp'
import { FormPayload } from 'main-site-shared/lib/models/form/FormPayload'

import { Buttons } from './Buttons'
import { Selects } from './Selects'
import { FormOutcome } from './FormOutcome'
import { Config } from '../../config/Config'
import { AppContext } from '../../contexts/AppContext'
import { ArrayWithEnd } from '../../models/ArrayWithEnd'
import { AsyncState } from '../../models/AsyncState'
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
import { HttpUtils } from '../../utils/HttpUtils'
import { Dharmachakra } from '../../utils/svg'

interface Props {
  onSubmit: () => void
}

export const Form: FunctionComponent<Props> = ({ onSubmit }) => {
  const transl = useContext(AppContext).translation

  const [selected, setSelected] = useState<ArrayWithEnd<Answer, EndOutput>>(Maybe.none)
  const [freeMsg, setFreeMsg] = useState<Maybe<string>>(Maybe.none)
  const [asyncState, setAsyncState] = useState<AsyncState<void>>(AsyncState.Success(undefined))

  const enabled =
    !AsyncState.isLoading(asyncState) &&
    (lastAnswerLeadsToNone() || (lastAnswerLeadsToFreeMsg() && freeMsgIsDefined()))

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

      <div css={styles.footer}>
        <span css={styles.error}>{AsyncState.isError(asyncState) ? asyncState.message : null}</span>
        <Buttons.Primary disabled={!enabled} onClick={submitForm}>
          {AsyncState.isLoading(asyncState) ? <Dharmachakra /> : transl.contact.send}
        </Buttons.Primary>
      </div>
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
      Future.fromIOEither(IO.apply(() => setAsyncState(AsyncState.Loading))),
      Future.chain(_ => HttpUtils.post(`${Config.apiHost}/api/contact`, payload)),
      Future.chain(res =>
        pipe(
          Future.apply(() => res.text()),
          Future.chain(body => handleResponse(res, body))
        )
      ),
      Future.runUnsafe
    )
  }

  function handleResponse(res: Response, body: string): Future<void> {
    return pipe(
      res.ok
        ? pipe(
            IO.apply(() => setAsyncState(AsyncState.Success(undefined))),
            IO.chain(_ => IO.apply(() => onSubmit()))
          )
        : IO.apply(() => setAsyncState(AsyncState.Error(errorMessage(res, body)))),
      Future.fromIOEither
    )
  }

  function errorMessage(res: Response, body: string): ReactNode {
    return res.status === 401 && body === 'Too many requests'
      ? transl.contact.errors.tooManyRequests
      : transl.contact.errors.otherError
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
  }),

  footer: css({
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }),

  error: css({
    display: 'flex',
    textAlign: 'center',
    fontSize: '0.9em',
    color: 'darkred',
    marginBottom: '0.67em'
  })
}
