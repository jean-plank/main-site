import React, { RefObject } from 'react'

export default React.createContext<RefObject<HTMLElement>>({ current: null })
