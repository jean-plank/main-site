/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { createRef, FunctionComponent, RefObject, useContext } from 'react'

import bgNotFoundJpg from '../../../img/bg_not_found.jpg'

import { Choice, OptionsGetable, Select, ChoiceOption } from './Select'
import AppContext from '../../contexts/AppContext'

const choice = (label: string, options: NonEmptyArray<ChoiceOption>): Choice => ({
  label,
  options
})

const option = (label: string, leadsTo?: Choice): ChoiceOption => {
  const value = Math.random().toString(36).substring(2)
  return { value, label, leadsTo: O.fromNullable(leadsTo) }
}

export const Contact: FunctionComponent = () => {
  const optionsGetable: RefObject<OptionsGetable> = createRef()
  const transl = useContext(AppContext).translation

  return (
    <div css={styles.contact}>
      <div css={styles.container}>
        <div css={styles.form}>
          <div css={styles.selects}>
            <Select
              ref={optionsGetable}
              i={0}
              choice={choice('Premier choix :', [
                option('option 1'),
                option(
                  'option 2',
                  choice('Deuxième choix :', [
                    option('option 2 - 1'),
                    option(
                      'option 2 - 2',
                      choice('Troisième choix :', [
                        option('option 2 - 2 - 1'),
                        option('option 2 - 2 - 2')
                      ])
                    )
                  ])
                )
              ])}
            />
          </div>

          <button onClick={submitForm} css={styles.sendBtn}>
            {transl.contact.send}
          </button>
        </div>
      </div>
    </div>
  )

  function submitForm() {
    const res = pipe(
      O.fromNullable(optionsGetable.current),
      O.fold(
        () => [],
        _ => _.getOptions()
      )
    ).map(_ =>
      pipe(
        _,
        O.map(opt => [opt.value, opt.label])
      )
    )
    console.table(res)
  }
}

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
    minHeight: '70%',
    display: 'flex',
    alignItems: 'stretch'
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
    padding: '0.1em 0.5em 0.1em 0.4em',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.3s',

    '&:not([disabled])': {
      cursor: 'pointer',
      backgroundColor: '#b59458',
      color: '#f6f0cd',
      border: '4px solid #b59458',
      boxShadow: '0 0 9px -3px black'
    },

    '&[disabled]': {
      backgroundColor: '#e9e1c1',
      color: '#aeab9a',
      border: '4px solid #d7cc9e'
    },

    '&::after': {
      content: `''`,
      width: '100%',
      borderBottom: '2px solid #f6f0cd',
      borderRadius: '50%',
      opacity: 0,
      transition: 'all 0.3s'
    },

    '&:not([disabled]):hover::after': {
      opacity: 1
    }
  })
}
