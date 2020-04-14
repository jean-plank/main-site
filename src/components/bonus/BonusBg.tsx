/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { FunctionComponent } from 'react'
import * as ReactDom from 'react-dom'

import oldBackgroundJpg from '../../../img/old_background.jpg'

import { fadeIn } from '../../utils/css/fadeIn'

export const BonusBg: FunctionComponent = () =>
  pipe(
    O.fromNullable(document.getElementById('bg')),
    O.map(elt => ReactDom.createPortal(<img src={oldBackgroundJpg} css={style} />, elt)),
    O.toNullable
  )

const style = css({
  height: '100vh',
  width: '100%',
  objectFit: 'cover',
  position: 'absolute',
  animation: fadeIn('0.75s')
})
