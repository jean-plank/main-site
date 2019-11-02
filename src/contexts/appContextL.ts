import React, { RefObject, useContext } from 'react'

import ParallaxRefContext from './ParallaxRefContext'
import TranslationContext, { Translation } from './TranslationContext'

interface Context {
    translation: Translation
    parallaxRef: RefObject<HTMLElement>
}

export default () =>
    React.createContext<Context>({
        translation: useContext(TranslationContext),
        parallaxRef: useContext(ParallaxRefContext)
    })
