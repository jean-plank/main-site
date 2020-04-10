/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import * as A from 'fp-ts/lib/Array'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import * as O from 'fp-ts/lib/Option'
import { Option } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import {
  ChangeEvent,
  createRef,
  forwardRef,
  ReactNode,
  RefObject,
  useImperativeHandle,
  useState,
  Fragment,
  ForwardRefRenderFunction
} from 'react'

import { fontFamily } from '../../utils/css/fonts'

export interface Choice {
  label: string
  options: NonEmptyArray<ChoiceOption>
}

export interface ChoiceOption {
  label: string
  value: string
  leadsTo: Option<Choice>
}

export interface OptionsGetable {
  getOptions: () => Option<ChoiceOption>[]
}

interface Props {
  i: number
  choice: Choice
}

const _Select: ForwardRefRenderFunction<OptionsGetable, Props> = ({ i, choice }, ref) => {
  useImperativeHandle(ref, () => ({ getOptions }))

  const optionsGetable: RefObject<OptionsGetable> = createRef()

  const [selected, setSelected] = useState<Option<ChoiceOption>>(O.none)

  const value = pipe(
    selected,
    O.fold(
      () => NONE,
      _ => _.value
    )
  )

  const leadsTo: ReactNode = pipe(
    selected,
    O.chain(_ => _.leadsTo),
    O.fold(
      () => null,
      _ => <Select ref={optionsGetable} i={i + 1} choice={_} />
    )
  )

  return (
    <Fragment>
      <label css={styles.label}>
        {choice.label}

        <select value={value} onChange={onChange} css={styles.select}>
          <option value={NONE} css={styles.option}>
            {' '}
          </option>
          {choice.options.map(choice => (
            <option key={choice.value} value={choice.value} css={styles.option}>
              {choice.label}
            </option>
          ))}
        </select>
      </label>
      {leadsTo}
    </Fragment>
  )

  function onChange(e: ChangeEvent<HTMLSelectElement>) {
    const newChoice = pipe(
      choice.options,
      A.findFirst(_ => _.value === e.target.value)
    )
    setSelected(newChoice)
  }

  function getOptions(): Option<ChoiceOption>[] {
    const tail = pipe(
      O.fromNullable(optionsGetable.current),
      O.map(_ => _.getOptions()),
      O.getOrElse(() => [])
    )
    return [selected, ...tail]
  }
}
export const Select = forwardRef<OptionsGetable, Props>(_Select)

const NONE = 'none'

const styles = {
  label: css({
    display: 'block',
    width: '100%',
    marginBottom: '0.67em'
  }),

  select: css({
    fontFamily: 'inherit',
    fontSize: '0.8em',
    cursor: 'pointer',
    display: 'block',
    width: '100%',
    backgroundColor: '#e9e1c1',
    color: 'black',
    border: '4px solid #d7cc9e',
    marginTop: '0.33em',
    padding: '0.1em 0.33em',
    appearance: 'none',

    backgroundImage:
      "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')",
    backgroundRepeat: 'no-repeat, repeat',
    backgroundPosition: 'right .7em top 50%, 0 0',
    backgroundSize: '.65em auto, 100%',

    '&::-ms-expand': {
      display: 'none'
    },

    '&:hover': {
      borderColor: '#aeab9a'
    },

    '&:focus': {
      borderColor: '#aeab9a'
    },

    // Support for rtl text, explicit support for Arabic and Hebrew
    '*[dir="rtl"] &, :root:lang(ar) &, :root:lang(iw) &': {
      backgroundPosition: 'left .7em top 50%, 0 0',
      padding: '.6em .8em .5em 1.4em'
    },

    // Disabled styles
    '&:disabled, &[aria-disabled=true]': {
      color: 'graytext',
      backgroundImage:
        "url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22graytext%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E'), linear-gradient(to bottom, #ffffff 0%,#e5e5e5 100%)"
    },

    '&:disabled:hover': {
      borderColor: '#aaa'
    }
  }),

  option: css({
    display: 'block',
    fontFamily: fontFamily.piecesOfEight,
    color: 'red'
  })
}
