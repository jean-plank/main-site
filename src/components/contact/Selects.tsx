/** @jsx jsx */
import * as A from 'fp-ts/lib/Array'
import * as Nea from 'fp-ts/lib/NonEmptyArray'
import * as O from 'fp-ts/lib/Option'
import { css, jsx } from '@emotion/core'
import { Option } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { Do } from 'fp-ts-contrib/lib/Do'
import { Fragment, FunctionComponent, Dispatch, useContext } from 'react'

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

  const selectedAnswer: Option<Answer> = ArrayWithEnd.head(selected)

  const leadsTo: Option<Props> = Do(O.option)
    .bind('selectedAnswer', selectedAnswer)
    .bindL('question', ({ selectedAnswer }) =>
      O.option.filter(selectedAnswer.leadsTo, AnswerNext.isQuestion)
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
          options={pipe(question.answers, Nea.map(toSelectOption))}
          selected={pipe(selectedAnswer, O.map(toSelectOption))}
          setSelected={setSelectedAnswer}
          styles={styles.select}
        />
      </div>
      {pipe(
        leadsTo,
        O.fold(
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

  function setSelectedAnswer(a: Option<SelectValue>): void {
    const newSelected: ArrayWithEnd<Answer, EndOutput> = pipe(
      a,
      O.chain(k =>
        pipe(
          question.answers,
          A.findFirst(_ => _.value === k)
        )
      ),
      O.chain(a => {
        const answerChanged = !pipe(
          selectedAnswer,
          O.exists(_ => _.value === a.value)
        )

        if (answerChanged) {
          const newOutput: Option<EndOutput> = pipe(a.leadsTo, O.filter(AnswerNext.isEndOutput))
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
