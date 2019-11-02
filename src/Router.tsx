/** @jsx jsx */
import { jsx } from '@emotion/core'
import { FunctionComponent, ReactElement, useContext, useEffect } from 'react'

import Home from './components/Home'
import NotFound from './components/NotFound'
import TranslationContext, { Translation } from './contexts/TranslationContext'

interface Props {
    path: string
}

const Router: FunctionComponent<Props> = ({ path }) => {
    const transl = useContext(TranslationContext)
    const [subTitle, node] = route(transl)(path)
    const title = `Jean Plank | ${subTitle}`

    useEffect(() => {
        document.title = title
    }, [title])

    return node
}
export default Router

const route = (transl: Translation) => (
    path: string
): [string, ReactElement] => {
    /* tslint:disable: jsx-key */
    if (path === '/') return [transl.mainStory, <Home />]
    return [transl.notFound, <NotFound />]
    /* tslint:enable: jsx-key */
}
