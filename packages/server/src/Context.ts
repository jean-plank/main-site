import { Route } from './models/Route'

import { Routes } from './Routes'

export const Context = () => {
  const routes: Route[] = Routes()

  return { routes }
}
