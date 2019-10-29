/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FunctionComponent, useContext, useState } from 'react'

import jpgs from '../../img/*.jpg'

import HistoryContext from '../contexts/HistoryContext'
import TranslationContext, {
    defaultLanguage,
    translations
} from '../contexts/TranslationContext'
import Router from '../Router'
import fonts, { fontFamily } from '../utils/fonts'
import media from '../utils/media'
import parallaxStyles from '../utils/parallaxStyles'
import Header from './Header'

const App: FunctionComponent = () => {
    const history = useContext(HistoryContext)
    const [path, setPath] = useState(history.location.pathname)
    const [lang, setLang] = useState(defaultLanguage)

    history.listen((location, action) => {
        console.log('location =', location)
        console.log('action =', action)
        setPath(location.pathname)
    })

    return (
        <TranslationContext.Provider value={translations[lang]}>
            <div
                id='parallax'
                css={[fonts, parallaxStyles.parallax, styles.app]}
            >
                <div
                    id='bg'
                    className='parallax-layer parallax-layer-back row justify-center align-center'
                    css={[parallaxStyles.parallaxLayerBack, styles.bg]}
                >
                    <img src={jpgs.background} />
                </div>

                <Router path={path} />

                <Header currentLang={lang} setLanguage={setLang} />
            </div>
        </TranslationContext.Provider>
    )
}
export default App

const styles = {
    app: css({
        fontFamily: fontFamily.piecesOfEight,
        backgroundColor: 'black',
        [media.desktop]: {
            fontSize: '2vw'
        },
        [media.mobile]: {
            fontSize: '2.65vw'
        }
    }),
    bg: css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200vh',
        width: '100vw',
        overflow: 'hidden',

        '& img': {
            height: '100%',
            width: '100%',
            objectFit: 'cover'
        }
    })
}
