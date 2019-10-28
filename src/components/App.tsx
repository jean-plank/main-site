/** @jsx jsx */
import { jsx } from '@emotion/core'
import { FunctionComponent, useContext, useState } from 'react'

import historyContext from '../contexts/historyContext'
import Router from '../Router'

const App: FunctionComponent = () => {
    const history = useContext(historyContext)
    const [path, setPath] = useState(history.location.pathname)

    history.listen((location, action) => {
        console.log('location =', location)
        console.log('action =', action)
        setPath(location.pathname)
    })

    return (
        <div>
            <div>App</div>
            <Router path={path} />
        </div>
    )
}
export default App
