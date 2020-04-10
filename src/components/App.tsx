/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FunctionComponent, useContext, useRef, useState } from 'react'

import Header from './header/Header'
import AppContext from '../contexts/AppContext'
import HistoryContext from '../contexts/HistoryContext'
import { defaultLanguage, LANG_KEY, Language, translations } from '../contexts/translation'
import Router from '../Router'
import fonts, { fontFamily } from '../utils/css/fonts'
import media from '../utils/css/media'
import * as parallax from '../utils/css/parallax'
import params from '../utils/css/params'

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
      <div ref={parallaxRef} css={[fonts, parallax.container, styles.app]}>
        <Router path={path} />
        <Header currentLang={lang} setLanguage={setLanguage} />
      </div>
    </AppContext.Provider>
  )

  function setLanguage(lang: Language) {
    localStorage.setItem(LANG_KEY, lang)
    setLang(lang)
  }
}
export default App

const styles = {
  app: css({
    fontFamily: fontFamily.piecesOfEight,

    [media.desktop]: {
      fontSize: params.fontSize.desktop
    },

    [media.mobile]: {
      fontSize: params.fontSize.mobile
    }
  })
}
