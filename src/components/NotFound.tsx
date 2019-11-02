/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FunctionComponent, useContext } from 'react'

import jpgs from '../../img/*.jpg'
import pngs from '../../img/*.png'

import AppContext from '../contexts/AppContext'
import fadeIn from '../utils/css/fadeIn'
import params from '../utils/css/params'

const NotFound: FunctionComponent = () => {
    const transl = useContext(AppContext).translation
    return (
        <div css={styles.container}>
            <img css={styles.imgBg} src={jpgs.plage3} />
            <img css={styles.imgJp} src={pngs.jp_perdu} />
            <div css={styles.message}>{transl.notFound.message}</div>
        </div>
    )
}
export default NotFound

const styles = {
    container: css({
        height: '100%',
        position: 'relative'
    }),

    imgBg: css({
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    }),

    imgJp: css({
        position: 'absolute',
        height: '80%',
        left: '2%',
        bottom: 0,
        animation: fadeIn('1.5s')
    }),

    message: css({
        position: 'absolute',
        bottom: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: params.title.color,
        textShadow: '0 0 3px black',
        fontSize: '2.5rem',
        padding: '0.33em 0.67em',
        backgroundColor: params.title.bg,
        opacity: 0,
        animation: fadeIn('1.5s', '1.5s')
    })
}
