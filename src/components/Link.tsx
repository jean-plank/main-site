/** @jsx jsx */
import { Interpolation, jsx } from '@emotion/core'
import React, { FunctionComponent, useContext } from 'react'

import historyContext from '../contexts/historyContext'

interface Props {
    to: string
    external?: boolean
    target?: string
    css?: Interpolation
}

const Link: FunctionComponent<Props> = ({
    to,
    external = false,
    target,
    css,
    children
}) => {
    const history = useContext(historyContext)

    return (
        <a href={to} onClick={onClick} target={target} css={css}>
            {children}
        </a>
    )

    function onClick(e: React.MouseEvent) {
        if (!external) {
            e.preventDefault()
            history.push(to)
        }
    }
}
export default Link
