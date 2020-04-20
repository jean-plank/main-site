import { MongoClient, Collection } from 'mongodb'

import { pipe, Future } from 'main-site-shared/lib/fp'

import { startWebServer as _startWebServer } from './Webserver'
import { Config } from './config/Config'
import { ContactController } from './controllers/ContactController'
import { Route } from './models/Route'
import { ContactPersistence } from './persistence/ContactPersistence'
import { Routes } from './route/Routes'
import { ContactService } from './services/ContactService'
import { PartialLogger } from './services/Logger'

export const Context = (config: Config) => {
  const Logger = PartialLogger(config.logLevel)

  const url = `mongodb://${config.db.user}:${config.db.password}@${config.db.host}`
  const mongoCollection = (coll: string): Future<Collection> =>
    pipe(
      Future.apply(() => new MongoClient(url, { useUnifiedTopology: true }).connect()),
      Future.map(_ => _.db(config.db.dbName).collection(coll))
    )

  const contactPersistence = ContactPersistence(Logger, mongoCollection)

  const ensureIndexes = (): Future<void> =>
    pipe(
      [
        // contactPersistence.ensureIndexes()
      ],
      Future.parallel,
      Future.map(_ => {})
    )

  const contactService = ContactService(Logger, contactPersistence)

  const contactController = ContactController(Logger, contactService)

  const routes: Route[] = Routes(contactController)
  const startWebServer = () => _startWebServer(Logger, config, routes)

  return { Logger, ensureIndexes, startWebServer }
}
