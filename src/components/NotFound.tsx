/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FunctionComponent, useContext } from 'react'

import jpgs from '../../img/*.jpg'
import pngs from '../../img/*.png'

import AppContext from '../contexts/AppContext'
import fadeIn from '../utils/css/fadeIn'

const NotFound: FunctionComponent = () => {
    const transl = useContext(AppContext).translation
    return (
        <div css={styles.container}>
            <img css={styles.imgBg} src={jpgs.bg_not_found} />
            <img css={styles.imgJp} src={pngs.jp_perdu} />
            <div css={styles.messageContainer}>
                <div css={styles.message}>{transl.notFound.message}</div>
            </div>
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
        height: '100%'
    }),

    imgJp: css({
        position: 'absolute',
        height: '80%',
        right: '5%',
        bottom: 0,
        animation: fadeIn('1.5s')
    }),

    messageContainer: css({
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textShadow: '0 0 3px black',
        fontSize: '2.5rem'
    }),

    message: css({
        padding: '0.33em 0.67em'
    })
}
