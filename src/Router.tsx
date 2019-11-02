/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { FunctionComponent, ReactElement, useContext, useEffect } from 'react'

import Home from './components/Home'
import NotFound from './components/NotFound'
import AppContext from './contexts/AppContext'
import { Translation } from './contexts/translation'

interface Props {
    path: string
}

const Router: FunctionComponent<Props> = ({ path }) => {
    const transl = useContext(AppContext).translation
    const [subTitle, node] = route(transl)(path)
    const title = [
        'Jean Plank',
        ...pipe(
            subTitle,
            O.fold(() => [], _ => [_])
        )
    ].join(' | ')

    useEffect(() => {
        document.title = title
    }, [title])

    return node
}
export default Router

const route = (transl: Translation) => (
    path: string
): [O.Option<string>, ReactElement] => {
    /* tslint:disable: jsx-key */
    if (path === '/') return [O.none, <Home />]
    return [O.some(transl.notFound.title), <NotFound />]
    /* tslint:enable: jsx-key */
}
