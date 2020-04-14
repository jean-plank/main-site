/** @jsx jsx */
import { jsx } from '@emotion/core'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import * as R from 'fp-ts/lib/Record'
import { FunctionComponent, ReactElement, useContext, useEffect } from 'react'

import { Bonus } from './components/bonus/Bonus'
import { Contact } from './components/contact/Contact'
import { Home } from './components/home/Home'
import { NotFound } from './components/NotFound'
import { AppContext } from './contexts/AppContext'
import { Translation } from './contexts/translation'
import { OptionHelpers } from './utils/OptionHelpers'

interface Props {
  path: string
}

export const Router: FunctionComponent<Props> = ({ path }) => {
  const transl = useContext(AppContext).translation
  const [subTitle, node] = route(transl)(path)
  const title = ['Jean Plank', ...OptionHelpers.toArray(subTitle)].join(' | ')

  useEffect(() => {
    document.title = title
  }, [title])

  return node
}

/* eslint-disable react/jsx-key */
const route = (transl: Translation) => (path: string): [O.Option<string>, ReactElement] =>
  pipe(
    R.lookup(path, {
      [routes.home]: [O.none, <Home />],
      [routes.bonus]: [O.some(transl.documentTitle.bonus), <Bonus />],
      [routes.contact]: [O.some(transl.documentTitle.contact), <Contact />]
    }),
    O.getOrElse(() => [O.some(transl.documentTitle.notFound), <NotFound />])
  )
/* eslint-enable react/jsx-key */

export const routes = {
  home: '/',
  bonus: '/bonus',
  contact: '/contact'
}
