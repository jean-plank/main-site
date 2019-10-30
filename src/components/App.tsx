/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import * as O from 'fp-ts/lib/Option'
import { FunctionComponent, useCallback, useContext, useState } from 'react'

import HistoryContext from '../contexts/HistoryContext'
import ParallaxEltContext from '../contexts/ParallaxEltContext'
import TranslationContext, {
    defaultLanguage,
    translations
} from '../contexts/TranslationContext'
import Router from '../Router'
import fonts, { fontFamily } from '../utils/css/fonts'
import media from '../utils/css/media'
import parallaxStyles from '../utils/css/parallaxStyles'
import Header from './Header'

const App: FunctionComponent = () => {
    const history = useContext(HistoryContext)
    const [path, setPath] = useState(history.location.pathname)
    history.listen(location => setPath(location.pathname))

    const [lang, setLang] = useState(defaultLanguage)

    const [parallaxElt, setParallaxElt] = useState<O.Option<HTMLElement>>(
        O.none
    )
    const parallaxRef = useCallback(_ => setParallaxElt(O.fromNullable(_)), [])

    return (
        <TranslationContext.Provider value={translations[lang]}>
            <ParallaxEltContext.Provider value={parallaxElt}>
                <div
                    ref={parallaxRef}
                    css={[fonts, parallaxStyles.parallax, styles.app]}
                >
                    <Router path={path} />
                    <Header currentLang={lang} setLanguage={setLang} />
                </div>
            </ParallaxEltContext.Provider>
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
