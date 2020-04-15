/** @jsx jsx */
import * as ReactDom from 'react-dom'
import { css, jsx } from '@emotion/core'
import { FunctionComponent } from 'react'

import { pipe, Maybe } from 'main-site-shared/lib/fp'

import oldBackgroundJpg from '../../../img/old_background.jpg'

import { fadeIn } from '../../utils/css/fadeIn'

export const BonusBg: FunctionComponent = () =>
  pipe(
    Maybe.fromNullable(document.getElementById('bg')),
    Maybe.map(elt => ReactDom.createPortal(<img src={oldBackgroundJpg} css={style} />, elt)),
    Maybe.toNullable
  )

const style = css({
  height: '100vh',
  width: '100%',
  objectFit: 'cover',
  position: 'absolute',
  animation: fadeIn('0.75s')
})
