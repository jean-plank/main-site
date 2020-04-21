/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Fragment, FunctionComponent, Dispatch, useContext } from 'react'

import { Do, Maybe, NonEmptyArray, pipe, List } from 'main-site-shared/lib/fp'

import { Select, SelectValue, SelectOption } from '../Select'
import { AppContext } from '../../contexts/AppContext'
import { Question, Answer, EndOutput, AnswerNext } from '../../models/form'
import { ArrayWithEnd } from '../../models/ArrayWithEnd'

interface Props {
  question: Question
  selected: ArrayWithEnd<Answer, EndOutput>
  setSelected: Dispatch<ArrayWithEnd<Answer, EndOutput>>
}

export const Selects: FunctionComponent<Props> = ({ question, selected, setSelected }) => {
  const transl = useContext(AppContext).translation.contact.form

  const selectedAnswer: Maybe<Answer> = ArrayWithEnd.head(selected)

  const leadsTo: Maybe<Props> = Do(Maybe.option)
    .bind('selectedAnswer', selectedAnswer)
    .bindL('question', ({ selectedAnswer }) =>
      Maybe.option.filter(selectedAnswer.leadsTo, AnswerNext.isQuestion)
    )
    .return(({ selectedAnswer, question }) => ({
      question,
      selected: ArrayWithEnd.tail(selected),
      setSelected: a => setSelected(ArrayWithEnd.cons(selectedAnswer, a))
    }))

  return (
    <Fragment>
      <div css={styles.container}>
        <span>{question.value(transl)}</span>

        <Select
          options={pipe(question.answers, NonEmptyArray.map(toSelectOption))}
          selected={pipe(selectedAnswer, Maybe.map(toSelectOption))}
          setSelected={setSelectedAnswer}
          styles={styles.select}
        />
      </div>
      {pipe(
        leadsTo,
        Maybe.fold(
          () => null,
          _ => <Selects {..._} />
        )
      )}
    </Fragment>
  )

  function toSelectOption(a: Answer): SelectOption {
    return {
      value: a.value,
      label: a.label(transl)
    }
  }

  function setSelectedAnswer(a: Maybe<SelectValue>): void {
    const newSelected: ArrayWithEnd<Answer, EndOutput> = pipe(
      a,
      Maybe.chain(k =>
        pipe(
          question.answers,
          List.findFirst(_ => _.value === k)
        )
      ),
      Maybe.chain(a => {
        const answerChanged = !pipe(
          selectedAnswer,
          Maybe.exists(_ => _.value === a.value)
        )

        if (answerChanged) {
          const newOutput: Maybe<EndOutput> = pipe(a.leadsTo, Maybe.filter(AnswerNext.isEndOutput))
          return ArrayWithEnd.some([a], newOutput)
        } else {
          return selected
        }
      })
    )
    setSelected(newSelected)
  }
}

const styles = {
  container: css({
    marginBottom: '0.9em'
  }),

  select: {
    container: css({
      marginTop: '0.4em'
    }),
    backgroundColor: '#e9e1c1',
    backgroundColorActive: '#d5d1bc',
    backgroundColorActiveActive: '#bfbca9',
    border: '4px solid #d7cc9e',
    borderColorActive: '#aeab9a',
    caretColor: '#aeab9a'
  }
}
