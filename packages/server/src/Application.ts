import * as H from 'hyper-ts'
import express, { RequestHandler } from 'express'
import { toRequestHandler, ExpressConnection, toArray, Action } from 'hyper-ts/lib/express'

import { Do, pipe, IO, Task, Either, List, Maybe } from 'main-site-shared/lib/fp'

import { Context } from './Context'
import { Config } from './config/Config'
import { EndedMiddleware } from './models/Route'
import { PartialLogger } from './services/Logger'

export const Application = (config: Config): IO<unknown> => {
  const Logger = PartialLogger(config.logLevel)
  const logger = Logger('App')

  const { routes } = Context()

  return pipe(
    IO.apply(() => express()),
    _ =>
      routes.reduce(
        (ioApp, [method, path, middleware]) =>
          pipe(
            ioApp,
            IO.chain(app => IO.apply(() => app[method](path, withLog(middleware))))
          ),
        _
      ),
    IO.chain(_ => IO.apply(() => _.use(withLog(notFound)))),
    IO.chain(_ =>
      IO.apply(() => _.listen(config.port, logger.info(`Server listening on port ${config.port}`)))
    )
  )

  function withLog(middleware: EndedMiddleware): RequestHandler {
    const res: EndedMiddleware = c =>
      Do(Task.task)
        .bind('res', middleware(c))
        .bindL('_', ({ res }) =>
          pipe(
            res,
            Either.fold(
              _ => Task.of(undefined),
              ([, _]) => logConnection(_ as ExpressConnection<H.ResponseEnded>)
            )
          )
        )
        .return(({ res }) => res)
    return toRequestHandler(res)
  }

  function logConnection(conn: ExpressConnection<H.ResponseEnded>): Task<unknown> {
    return pipe(
      logger.debug(
        conn.getMethod(),
        conn.getOriginalUrl(),
        '-',
        ...pipe(
          conn,
          getStatus,
          Maybe.fold(
            () => [],
            _ => [_.toString()]
          )
        )
      ),
      Task.fromIO
    )
  }
}

const notFound = pipe(
  H.status(H.Status.NotFound),
  H.ichain(() => H.closeHeaders()),
  H.ichain(() => H.send('Not Found'))
)

const getStatus = (conn: ExpressConnection<H.ResponseEnded>): Maybe<H.Status> =>
  pipe(
    toArray(conn.actions),
    List.findLast(isStatus),
    Maybe.map(_ => _.status)
  )

const isStatus = (a: Action): a is { type: 'setStatus'; status: H.Status } => a.type === 'setStatus'
