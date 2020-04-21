/** @jsx jsx */
import { css, jsx, keyframes } from '@emotion/core'

import { FunctionComponent } from 'react'

type SVGComponent = FunctionComponent<Props>

interface Props {
  className?: string
}

export const AngleDown: SVGComponent = ({ className }) => (
  <svg
    focusable='false'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 320 512'
    css={styles.base}
    className={className}
  >
    <path
      fill='currentColor'
      d='M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z'
    />
  </svg>
)

export const AngleUp: SVGComponent = ({ className }) => (
  <svg
    focusable='false'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 320 512'
    css={styles.base}
    className={className}
  >
    <path
      fill='currentColor'
      d='M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z'
    />
  </svg>
)

export const Ban: SVGComponent = ({ className }) => (
  <svg
    focusable='false'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 512 512'
    css={styles.base}
    className={className}
  >
    <g>
      <path
        fill='currentColor'
        d='M406.78 361.53a186.53 186.53 0 0 1-45.25 45.25L105.22 150.47a186.53 186.53 0 0 1 45.25-45.25z'
        css={styles.secondary}
      />
      <path
        fill='currentColor'
        d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm130.11 378.11A184 184 0 1 1 440 256a182.82 182.82 0 0 1-53.89 130.11z'
        css={styles.primary}
      />
    </g>
  </svg>
)

export const CaretLeft: SVGComponent = ({ className }) => (
  <svg
    focusable='false'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 192 512'
    css={styles.base}
    className={className}
  >
    <path
      fill='currentColor'
      d='M192 127.338v257.324c0 17.818-21.543 26.741-34.142 14.142L29.196 270.142c-7.81-7.81-7.81-20.474 0-28.284l128.662-128.662c12.599-12.6 34.142-3.676 34.142 14.142z'
    />
  </svg>
)

export const ChevronDoubleDown: SVGComponent = ({ className }) => (
  <svg
    focusable='false'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 448 512'
    css={styles.base}
    className={className}
  >
    <g>
      <path
        fill='currentColor'
        d='M207 285.54L12.7 91.14a23.9 23.9 0 0 1 0-33.9l22.7-22.7a24.08 24.08 0 0 1 33.9 0l154.7 154 154.7-154a23.9 23.9 0 0 1 33.9 0l22.7 22.7a23.9 23.9 0 0 1 0 33.9L241 285.54a24.2 24.2 0 0 1-34 0z'
        css={styles.secondary}
      />
      <path
        fill='currentColor'
        d='M207 477.54L12.7 283.14a23.9 23.9 0 0 1 0-33.9l22.7-22.7a23.9 23.9 0 0 1 33.9 0l154.7 154 154.7-154a24.08 24.08 0 0 1 33.9 0l22.7 22.7a23.9 23.9 0 0 1 0 33.9L241 477.54a24.2 24.2 0 0 1-34 0z'
        css={styles.primary}
      />
    </g>
  </svg>
)

export const Dharmachakra: SVGComponent = ({ className }) => (
  <svg
    focusable='false'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 512 512'
    css={[styles.base, styles.spin]}
    className={className}
  >
    <path
      fill='currentColor'
      d='M503.67 232.35l-24.81 1.03c-4.5-44.89-22.28-85.84-49.31-118.94l18.31-16.84c3.35-3.08 3.46-8.33.24-11.54l-22.15-22.15c-3.21-3.21-8.46-3.11-11.54.24l-16.84 18.31c-33.1-27.03-74.05-44.81-118.94-49.31l1.03-24.81a7.997 7.997 0 0 0-7.99-8.33h-31.32c-4.55 0-8.18 3.79-7.99 8.33l1.03 24.81c-44.88 4.5-85.84 22.28-118.94 49.31L97.6 64.15c-3.08-3.35-8.33-3.46-11.54-.24L63.91 86.05a7.99 7.99 0 0 0 .24 11.54l18.31 16.84c-27.04 33.1-44.81 74.05-49.31 118.94l-24.81-1.03c-4.55-.18-8.34 3.45-8.34 8v31.32c0 4.55 3.79 8.18 8.33 7.99l24.81-1.03c4.5 44.89 22.28 85.84 49.31 118.94l-18.3 16.84c-3.35 3.08-3.46 8.33-.24 11.54l22.15 22.15c3.21 3.22 8.46 3.11 11.54-.24l16.84-18.31c33.1 27.04 74.05 44.81 118.94 49.31l-1.03 24.81a7.997 7.997 0 0 0 7.99 8.33h31.32c4.55 0 8.18-3.79 7.99-8.33l-1.03-24.81c44.89-4.5 85.84-22.28 118.94-49.31l16.84 18.31c3.08 3.35 8.33 3.46 11.54.24l22.15-22.15a7.99 7.99 0 0 0-.24-11.54l-18.31-16.84c27.04-33.1 44.81-74.05 49.31-118.94l24.81 1.03c4.55.19 8.33-3.44 8.33-7.99v-31.32c.01-4.55-3.78-8.18-8.32-7.99zm-56.92 2.37l-96.49 4.02c-2.48-13.64-7.74-26.27-15.34-37.24l70.91-65.24c22.13 27.64 36.82 61.45 40.92 98.46zM256 320c-35.29 0-64-28.71-64-64s28.71-64 64-64 64 28.71 64 64-28.71 64-64 64zm119.74-213.83l-65.24 70.91c-10.97-7.6-23.6-12.86-37.24-15.34l4.02-96.49c37.01 4.1 70.82 18.79 98.46 40.92zM234.72 65.25l4.02 96.49c-13.64 2.48-26.27 7.74-37.24 15.34l-65.24-70.91c27.64-22.13 61.45-36.82 98.46-40.92zm-128.55 71.01l70.91 65.24c-7.6 10.97-12.86 23.6-15.34 37.24l-96.49-4.02c4.1-37.01 18.79-70.82 40.92-98.46zM65.25 277.28l96.49-4.02c2.48 13.64 7.74 26.27 15.34 37.24l-70.91 65.24c-22.13-27.64-36.82-61.45-40.92-98.46zm71.01 128.55l65.24-70.91c10.97 7.6 23.6 12.86 37.24 15.34l-4.02 96.49c-37.01-4.1-70.82-18.79-98.46-40.92zm141.02 40.92l-4.02-96.49c13.64-2.48 26.27-7.74 37.24-15.34l65.24 70.91c-27.64 22.13-61.45 36.82-98.46 40.92zm128.55-71.01l-70.91-65.24c7.6-10.97 12.86-23.6 15.34-37.24l96.49 4.02c-4.1 37.01-18.79 70.82-40.92 98.46z'
    />
  </svg>
)

export const ExternalLink: SVGComponent = ({ className }) => (
  <svg
    focusable='false'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 512 512'
    css={styles.base}
    className={className}
  >
    <g className='fa-group'>
      <path
        fill='currentColor'
        d='M400 320h32a16 16 0 0 1 16 16v128a48 48 0 0 1-48 48H48a48 48 0 0 1-48-48V112a48 48 0 0 1 48-48h160a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16H64v320h320V336a16 16 0 0 1 16-16z'
        css={styles.secondary}
      />
      <path
        fill='currentColor'
        d='M484 224h-17.88a28 28 0 0 1-28-28v-.78L440 128 192.91 376.91A24 24 0 0 1 159 377l-.06-.06L135 353.09a24 24 0 0 1 0-33.94l.06-.06L384 72l-67.21 1.9A28 28 0 0 1 288 46.68V28a28 28 0 0 1 28-28h158.67A37.33 37.33 0 0 1 512 37.33V196a28 28 0 0 1-28 28z'
        css={styles.primary}
      />
    </g>
  </svg>
)

const styles = {
  base: css({
    height: '1em'
  }),

  primary: css({}),

  secondary: css({
    opacity: 0.7
  }),

  spin: css({
    animation: `${spin()} 2s linear infinite`
  })
}

function spin() {
  return keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
  })
}
