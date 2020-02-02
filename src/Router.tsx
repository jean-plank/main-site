/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import * as R from 'fp-ts/lib/Record'
import { FunctionComponent, ReactElement, useContext, useEffect } from 'react'

import Bonus from './components/Bonus'
import { Contact } from './components/Contact'
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
            O.fold(
                () => [],
                _ => [_]
            )
        )
    ].join(' | ')

    useEffect(() => {
        document.title = title
    }, [title])

    return node
}
export default Router

/* tslint:disable: jsx-key */
const route = (transl: Translation) => (
    path: string
): [O.Option<string>, ReactElement] =>
    pipe(
        R.lookup(path, {
            [routes.home]: [O.none, <Home />],
            [routes.bonus]: [O.some(transl.bonus), <Bonus />],
            [routes.contact]: [O.some(transl.contact.title), <Contact />]
        }),
        O.getOrElse(() => [O.some(transl.notFound.title), <NotFound />])
    )
/* tslint:enable: jsx-key */

export const routes = {
    home: '/',
    bonus: '/bonus',
    contact: '/contact'
}
