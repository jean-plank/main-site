/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FunctionComponent, useContext, useRef, useState } from 'react'

import AppContext from '../contexts/AppContext'
import HistoryContext from '../contexts/HistoryContext'
import { defaultLanguage, translations } from '../contexts/translation'
import Router from '../Router'
import fonts, { fontFamily } from '../utils/css/fonts'
import media from '../utils/css/media'
import parallaxStyles from '../utils/css/parallax'
import params from '../utils/css/params'
import Header from './Header'

const App: FunctionComponent = () => {
    const history = useContext(HistoryContext)
    const [path, setPath] = useState(history.location.pathname)
    history.listen(location => setPath(location.pathname))

    const [lang, setLang] = useState(defaultLanguage)
    const parallaxRef = useRef<HTMLDivElement>(null)

    return (
        <AppContext.Provider
            value={{
                translation: translations[lang],
                parallaxRef
            }}
        >
            <div
                ref={parallaxRef}
                css={[fonts, parallaxStyles.parallax, styles.app]}
            >
                <Router path={path} />
                <Header currentLang={lang} setLanguage={setLang} />
            </div>
        </AppContext.Provider>
    )
}
export default App

const styles = {
    app: css({
        fontFamily: fontFamily.piecesOfEight,
        backgroundColor: 'black',

        [media.desktop]: {
            fontSize: params.fontSize.desktop
        },

        [media.mobile]: {
            fontSize: params.fontSize.mobile
        }
    })
}
