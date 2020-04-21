import { pipe, Future } from 'main-site-shared/lib/fp'

import { Config } from './config/Config'
import { Context } from './Context'

const main = (): Future<unknown> =>
  pipe(
    Future.fromIOEither(Config.load()),
    Future.chain(config => {
      const { ensureIndexes, startWebServer } = Context(config)
      return pipe(
        ensureIndexes(),
        Future.chain(_ => Future.fromIOEither(startWebServer()))
      )
    })
  )

Future.runUnsafe(main())
