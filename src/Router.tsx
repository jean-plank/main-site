/** @jsx jsx */
import { jsx } from '@emotion/core'
import { FunctionComponent } from 'react'

import Home from './components/Home'
import NotFound from './components/NotFound'

interface Props {
    path: string
}

const Router: FunctionComponent<Props> = ({ path }) => {
    if (path === '/') return <Home />
    return <NotFound />
}
export default Router
