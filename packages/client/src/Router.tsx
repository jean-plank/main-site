/** @jsx jsx */
import { jsx } from '@emotion/core'
import { FunctionComponent, ReactElement, useContext, useEffect } from 'react'

import { Maybe, pipe, Dict } from 'main-site-shared/lib/fp'

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
const route = (transl: Translation) => (path: string): [Maybe<string>, ReactElement] =>
  pipe(
    Dict.lookup(path, {
      [routes.home]: [Maybe.none, <Home />],
      [routes.bonus]: [Maybe.some(transl.documentTitle.bonus), <Bonus />],
      [routes.contact]: [Maybe.some(transl.documentTitle.contact), <Contact />]
    }),
    Maybe.getOrElse(() => [Maybe.some(transl.documentTitle.notFound), <NotFound />])
  )
/* eslint-enable react/jsx-key */

export const routes = {
  home: '/',
  bonus: '/bonus',
  contact: '/contact'
}
