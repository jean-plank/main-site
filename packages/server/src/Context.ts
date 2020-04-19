import { Route } from './models/Route'

import { Routes } from './Routes'
import { Config } from './config/Config'
import { ContactController } from './controllers/ContactController'
import { ContactService } from './services/ContactService'
import { PartialLogger } from './services/Logger'

export const Context = (config: Config) => {
  const Logger = PartialLogger(config.logLevel)

  const contactService = ContactService(Logger)

  const contactController = ContactController(Logger, contactService)

  const routes: Route[] = Routes(contactController)

  return { Logger, routes }
}
