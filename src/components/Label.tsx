/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FunctionComponent } from 'react'

import jpgs from '../../img/*.jpg'
import { fontFamily } from '../utils/css/fonts'

interface Props {
    className?: string
}

export const Label: FunctionComponent<Props> = ({ className, children }) => (
    <div className={className} css={styles}>
        {children}
    </div>
)

const styles = css({
    maxWidth: '1100px',
    margin: '0 1.67em',
    background: `url('${jpgs.label}')`,
    backgroundSize: 'cover',
    padding: '0.5em 1em 0.3em',
    border: '5px solid #8e6400',
    boxShadow: '0 0 10px black',
    fontSize: '0.9em',

    '& h4': {
        fontFamily: fontFamily.yarr,
        fontSize: '1.1em',
        letterSpacing: '0.03em'
    }
})
