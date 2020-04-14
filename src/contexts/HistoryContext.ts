import { createBrowserHistory } from 'history'
import { createContext } from 'react'

export const HistoryContext = createContext(createBrowserHistory())
