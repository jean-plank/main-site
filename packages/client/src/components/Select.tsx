/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core'
import { FunctionComponent, Dispatch, useState, MouseEventHandler, SetStateAction } from 'react'

import { Maybe, pipe, NonEmptyArray } from 'main-site-shared/lib/fp'

import { useClickOutside } from '../hooks/useClickOutside'
import { CaretLeft } from '../utils/svg'

export type SelectValue = string | number

export interface SelectOption {
  value: SelectValue
  label: string
}

interface Props {
  options: NonEmptyArray<SelectOption>
  selected: Maybe<SelectOption>
  setSelected: Dispatch<SetStateAction<Maybe<SelectValue>>>
  styles?: Partial<{
    container: SerializedStyles
    backgroundColor: string
    backgroundColorActive: string
    backgroundColorActiveActive: string
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
            Maybe.fold(
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
              onClick={select(Maybe.some(opt.value))}
              css={_styles.option(styles.backgroundColorActive, styles.backgroundColorActiveActive)}
              className={pipe(
                selected,
                Maybe.filter(_ => _.value === opt.value),
                Maybe.fold(
                  () => undefined,
                  _ => SELECTED
                )
              )}
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

  function select(opt: Maybe<SelectValue>): MouseEventHandler {
    return _ => {
      setSelected(opt)
      setIsOpen(false)
    }
  }
}

const OPENED = 'opened'
const SELECTED = 'selected'

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

  option: (backgroundColorActive?: string, backgroundColorActiveActive?: string) =>
    css({
      ...withPadding(),

      userSelect: 'none',
      cursor: 'pointer',

      [`&.${SELECTED}`]: {
        backgroundColor: withDefault(backgroundColorActive, '#eeeeee')
      },

      '&:hover, &:focus': {
        backgroundColor: withDefault(backgroundColorActive, '#eeeeee'),

        [`&.${SELECTED}`]: {
          backgroundColor: withDefault(backgroundColorActiveActive, '#dddddd')
        }
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
