/** @jsx jsx */
import * as O from 'fp-ts/lib/Option'
import { css, jsx, SerializedStyles } from '@emotion/core'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { Option } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { FunctionComponent, Dispatch, useState, MouseEventHandler, SetStateAction } from 'react'

import { useClickOutside } from '../hooks/useClickOutside'
import { CaretLeft } from '../utils/svg'

export type SelectValue = string | number

export interface SelectOption {
  value: SelectValue
  label: string
}

interface Props {
  options: NonEmptyArray<SelectOption>
  selected: Option<SelectOption>
  setSelected: Dispatch<SetStateAction<Option<SelectValue>>>
  styles?: Partial<{
    container: SerializedStyles
    backgroundColor: string
    backgroundColorActive: string
    border: string
    borderColorActive: string
    caretColor: string
  }>
}

export const Select: FunctionComponent<Props> = ({
  options,
  selected,
  setSelected,
  styles = {}
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const clickOutsideRef = useClickOutside<HTMLDivElement>(close)

  return (
    <div
      ref={clickOutsideRef}
      css={[_styles.container, styles.container]}
      className={isOpen ? OPENED : undefined}
    >
      <div
        onClick={toggleOpen}
        css={_styles.valueAndAngle(styles.backgroundColor, styles.border, styles.borderColorActive)}
      >
        <span css={_styles.value}>
          {pipe(
            selected,
            O.fold(
              () => ' ',
              _ => _.label
            )
          )}
        </span>
        <span css={_styles.caret(styles.caretColor)}>
          <CaretLeft />
        </span>
      </div>

      <div css={_styles.dropdownContainer}>
        <ul css={_styles.dropdown(styles.backgroundColor, styles.border)}>
          {options.map(opt => (
            <li
              key={opt.value}
              onClick={select(O.some(opt.value))}
              css={_styles.option(styles.backgroundColorActive)}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )

  function close(): void {
    setIsOpen(false)
  }

  function toggleOpen(): void {
    setIsOpen(_ => !_)
  }

  function select(opt: Option<SelectValue>): MouseEventHandler {
    return _ => {
      setSelected(opt)
      setIsOpen(false)
    }
  }
}

const OPENED = 'opened'

const _styles = {
  container: css({
    position: 'relative'
  }),

  valueAndAngle: (backgroundColor?: string, border?: string, borderColorActive?: string) =>
    css({
      display: 'flex',
      cursor: 'pointer',
      backgroundColor: withDefault(backgroundColor, 'white'),
      border: withDefault(border, '1px solid black'),

      [`.${OPENED} &, &:hover, &:focus`]: {
        borderColor: withDefault(borderColorActive, 'dodgerblue')
      }
    }),

  value: css({
    ...withPadding(),

    flexGrow: 1,
    userSelect: 'none'
  }),

  caret: (caretColor?: string) =>
    css({
      display: 'flex',
      alignItems: 'center',
      padding: '0 0.3em',
      color: withDefault(caretColor, 'black'),

      '& svg': {
        width: '0.33em',
        transform: 'rotate(0deg)',
        transition: 'transform 0.1s',

        [`.${OPENED} &`]: {
          transform: 'rotate(-90deg)'
        }
      }
    }),

  dropdownContainer: css({
    position: 'absolute',
    zIndex: 1,
    top: '100%',
    width: '100%',
    maxHeight: 0,
    overflow: 'hidden',
    transition: 'max-height 0.1s ease-out',

    [`.${OPENED} &`]: {
      maxHeight: '600px',
      transition: 'max-height 0.2s ease-in'
    }
  }),

  dropdown: (backgroundColor?: string, border?: string) =>
    css({
      backgroundColor: withDefault(backgroundColor, 'white'),
      border: withDefault(border, '1px solid black'),
      borderTopWidth: 0
    }),

  option: (backgroundColorActive?: string) =>
    css({
      ...withPadding(),

      userSelect: 'none',
      cursor: 'pointer',

      '&:hover, &:focus': {
        backgroundColor: withDefault(backgroundColorActive, '#eeeeee')
      }
    })
}

function withPadding() {
  return {
    padding: '0.3em'
  }
}

function withDefault<A>(a: A | undefined, defaultA: A): A {
  return a === undefined ? defaultA : a
}
