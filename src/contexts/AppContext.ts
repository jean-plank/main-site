import { RefObject, createContext } from 'react'

import { defaultLanguage, Translation, translations } from './translation'

interface Context {
  translation: Translation
  parallaxRef: RefObject<HTMLElement>
}

export const AppContext = createContext<Context>({
  translation: translations[defaultLanguage],
  parallaxRef: { current: null }
})
