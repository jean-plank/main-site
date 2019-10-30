import * as O from 'fp-ts/lib/Option'
import React from 'react'

export default React.createContext<O.Option<HTMLElement>>(O.none)
