import React, { RefObject } from 'react'

import { defaultLanguage, Translation, translations } from './translation'

interface Context {
    translation: Translation
    parallaxRef: RefObject<HTMLElement>
}

export default React.createContext<Context>({
    translation: translations[defaultLanguage],
    parallaxRef: { current: null }
})
