/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { FunctionComponent, useContext } from 'react'

import HistoryContext from '../contexts/HistoryContext'

interface Props {
    to: string
    target?: string
    className?: string
}

const Link: FunctionComponent<Props> = ({
    to,
    target,
    className,
    children
}) => {
    const history = useContext(HistoryContext)

    return (
        <a href={to} onClick={onClick} target={target} className={className}>
            {children}
        </a>
    )

    function onClick(e: React.MouseEvent) {
        e.preventDefault()
        history.push(to)
    }
}
export default Link
