/** @jsx jsx */
import { Interpolation, jsx } from '@emotion/core'
import React, { FunctionComponent, useContext } from 'react'

import HistoryContext from '../contexts/HistoryContext'

interface Props {
    to: string
    target?: string
    css?: Interpolation
}

const Link: FunctionComponent<Props> = ({ to, target, css, children }) => {
    const history = useContext(HistoryContext)

    return (
        <a href={to} onClick={onClick} target={target} css={css}>
            {children}
        </a>
    )

    function onClick(e: React.MouseEvent) {
        e.preventDefault()
        history.push(to)
    }
}
export default Link
