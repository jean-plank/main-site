import css from '@emotion/css'

import bucaneraTTF from '../../../fonts/bucanera.ttf'
import piecesOfEightTTF from '../../../fonts/pieces-of-eight.ttf'
import baloopaaji2TTF from '../../../fonts/baloopaaji2-bold.ttf'
import baloopaaji2BoldTTF from '../../../fonts/baloopaaji2.ttf'

export const fontFamily = {
  yarr: 'yarr',
  piecesOfEight: 'piecesOfEight',
  baloopaaji2: 'baloopaaji2'
}

export const fonts = css(
  {
    '@font-face': {
      fontFamily: fontFamily.yarr,
      src: `url('${bucaneraTTF}')`,
      fontWeight: 'normal'
    }
  },
  {
    '@font-face': {
      fontFamily: fontFamily.piecesOfEight,
      src: `url('${piecesOfEightTTF}')`,
      fontWeight: 'normal'
    }
  },
  {
    '@font-face': {
      fontFamily: fontFamily.baloopaaji2,
      src: `url('${baloopaaji2TTF}')`,
      fontWeight: 'normal'
    }
  },
  {
    '@font-face': {
      fontFamily: fontFamily.baloopaaji2,
      src: `url('${baloopaaji2BoldTTF}')`,
      fontWeight: 'bold'
    }
  }
)
