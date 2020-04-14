/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FunctionComponent } from 'react'

import { Ban } from '../../utils/svg'
import { fontFamily } from '../../utils/css/fonts'
import { params } from '../../utils/css/params'

export const Under18: FunctionComponent = ({ children }) => (
  <div css={styles18.container}>
    <span css={styles18.sign}>
      <span css={styles18.eighteen}>-18</span>
      <Ban css={styles18.ban} />
    </span>
    <span css={styles18.message}>{children}</span>
  </div>
)

const styles18 = {
  container: css({
    fontFamily: fontFamily.baloopaaji2,
    height: '1.7em',
    display: 'flex',
    alignItems: 'center'
  }),

  sign: css({
    position: 'relative',
    marginRight: '0.33em',
    display: 'flex',
    alignItems: 'center'
  }),

  eighteen: css({
    display: 'inline-block',
    padding: '0 0.1em 0 0.22em',
    fontSize: '0.9em',
    letterSpacing: '-2px',
    color: 'goldenrod'
  }),

  ban: css({
    position: 'absolute',
    left: 0,
    height: '1.45em',
    color: params.game.notOutYet.bg
  }),

  message: css({
    alignSelf: 'center',
    fontSize: '0.5em',
    padding: '0.33em 0'
  })
}
