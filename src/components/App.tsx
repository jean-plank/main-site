/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FunctionComponent, useContext, useRef, useState } from 'react'

import HistoryContext from '../contexts/HistoryContext'
import ParallaxRefContext from '../contexts/ParallaxRefContext'
import TranslationContext, {
    defaultLanguage,
    translations
} from '../contexts/TranslationContext'
import Router from '../Router'
import fonts, { fontFamily } from '../utils/css/fonts'
import media from '../utils/css/media'
import parallaxStyles from '../utils/css/parallax'
import Header from './Header'

const App: FunctionComponent = () => {
    const history = useContext(HistoryContext)
    const [path, setPath] = useState(history.location.pathname)
    history.listen(location => setPath(location.pathname))

    const [lang, setLang] = useState(defaultLanguage)

    const parallaxRef = useRef<HTMLDivElement>(null)

    return (
        <TranslationContext.Provider value={translations[lang]}>
            <ParallaxRefContext.Provider value={parallaxRef}>
                <div
                    ref={parallaxRef}
                    css={[fonts, parallaxStyles.parallax, styles.app]}
                >
                    <Router path={path} />
                    <Header currentLang={lang} setLanguage={setLang} />
                </div>
            </ParallaxRefContext.Provider>
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
    })
}
