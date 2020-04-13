/** @jsx jsx */
import { css, jsx } from '@emotion/core'

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
  })
}
