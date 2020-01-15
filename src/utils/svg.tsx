/** @jsx jsx */
import { css, jsx } from '@emotion/core'

import { FunctionComponent } from 'react'

type SVGComponent = FunctionComponent<Props>

interface Props {
    className?: string
}

export const AngleUp: SVGComponent = ({ className }) => (
    <svg
        focusable='false'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 320 512'
        className={className}
    >
        <path
            fill='currentColor'
            d='M177 159.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 255.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 329.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1z'
        />
    </svg>
)

export const AngleDown: SVGComponent = ({ className }) => (
    <svg
        focusable='false'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 320 512'
        className={className}
    >
        <path
            fill='currentColor'
            d='M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z'
        />
    </svg>
)

export const AngleRight: SVGComponent = ({ className }) => (
    <svg
        focusable='false'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 192 512'
        className={className}
    >
        <path
            fill='currentColor'
            d='M187.8 264.5L41 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 392.7c-4.7-4.7-4.7-12.3 0-17L122.7 256 4.2 136.3c-4.7-4.7-4.7-12.3 0-17L24 99.5c4.7-4.7 12.3-4.7 17 0l146.8 148c4.7 4.7 4.7 12.3 0 17z'
        />
    </svg>
)

export const AngleLeft: SVGComponent = ({ className }) => (
    <svg
        focusable='false'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 256 512'
        className={className}
    >
        <path
            fill='currentColor'
            d='M4.2 247.5L151 99.5c4.7-4.7 12.3-4.7 17 0l19.8 19.8c4.7 4.7 4.7 12.3 0 17L69.3 256l118.5 119.7c4.7 4.7 4.7 12.3 0 17L168 412.5c-4.7 4.7-12.3 4.7-17 0L4.2 264.5c-4.7-4.7-4.7-12.3 0-17z'
        />
    </svg>
)

export const ChevronDoubleDown: SVGComponent = ({ className }) => (
    <svg
        focusable='false'
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 448 512'
        css={styles}
        className={className}
    >
        <g>
            <path
                fill='currentColor'
                d='M207 285.54L12.7 91.14a23.9 23.9 0 0 1 0-33.9l22.7-22.7a24.08 24.08 0 0 1 33.9 0l154.7 154 154.7-154a23.9 23.9 0 0 1 33.9 0l22.7 22.7a23.9 23.9 0 0 1 0 33.9L241 285.54a24.2 24.2 0 0 1-34 0z'
                className='fa-secondary'
            />
            <path
                fill='currentColor'
                d='M207 477.54L12.7 283.14a23.9 23.9 0 0 1 0-33.9l22.7-22.7a23.9 23.9 0 0 1 33.9 0l154.7 154 154.7-154a24.08 24.08 0 0 1 33.9 0l22.7 22.7a23.9 23.9 0 0 1 0 33.9L241 477.54a24.2 24.2 0 0 1-34 0z'
                className='fa-primary'
            />
        </g>
    </svg>
)

const styles = css({
    '& .fa-secondary': {
        opacity: 0.6
    }
})
