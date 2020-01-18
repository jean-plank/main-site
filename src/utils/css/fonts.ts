import css from '@emotion/css'

import bucaneraEOT from '../../../fonts/bucanera.eot'
import bucaneraSVG from '../../../fonts/bucanera.svg'
import bucaneraWOFF from '../../../fonts/bucanera.woff'
import bucaneraWOFF2 from '../../../fonts/bucanera.woff2'
import piecesOfEight from '../../../fonts/pieces-of-eight.ttf'

export const fontFamily = {
    yarr: 'yarr',
    piecesOfEight: 'piecesOfEight',
    normal: 'Verdana, Geneva, Tahoma, sans-serif'
}

const fonts = css(
    {
        '@font-face': {
            fontFamily: fontFamily.yarr,
            src: `url('${bucaneraEOT}'),
                  url('${bucaneraEOT}?#iefix') format('embedded-opentype'),
                  url('${bucaneraWOFF2}') format('woff2'),
                  url('${bucaneraWOFF}') format('woff'),
                  url('${bucaneraSVG}#Bucanera-FFP') format('svg')`,
            fontWeight: 400
        }
    },
    {
        '@font-face': {
            fontFamily: fontFamily.piecesOfEight,
            src: `url('${piecesOfEight}')`
        }
    }
)
export default fonts
