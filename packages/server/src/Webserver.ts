import * as H from 'hyper-ts'
import express, { ErrorRequestHandler } from 'express'
import { toRequestHandler, ExpressConnection, toArray, Action } from 'hyper-ts/lib/express'

import { Do, pipe, IO, Task, Either, List, Maybe, Future } from 'main-site-shared/lib/fp'

import { Config } from './config/Config'
import { EndedMiddleware } from './models/EndedMiddleware'
import { Route } from './models/Route'
import { PartialLogger, Logger } from './services/Logger'

export const startWebServer = (
  Logger: PartialLogger,
  config: Config,
  routes: Route[]
): IO<unknown> => {
  const logger = Logger('WebServer')

  const withCors = pipe(
    IO.apply(() => express()),
    IO.chain(_ =>
      IO.apply(() =>
        _.use((req, res, next) => {
          // TODO: extract authorized origins to conf
          res.append('Access-Control-Allow-Origin', 'http://192.168.1.1:8675')
          res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
          )
          if (req.method === 'OPTIONS') res.send()
          else next()
        })
      )
    )
  )

  return pipe(
    routes,
    List.reduce(withCors, (ioApp, [method, path, middleware]) =>
      pipe(
        ioApp,
        IO.chain(app =>
          IO.apply(() => app[method](path, pipe(middleware, withTry, withLog, toRequestHandler)))
        )
      )
    ),
    IO.chain(_ =>
      IO.apply(() => _.use(pipe(EndedMiddleware.NotFound(), withLog, toRequestHandler)))
    ),
    IO.chain(_ => IO.apply(() => _.use(errorHandler(onError)))),
    IO.chain(_ =>
      IO.apply(() => _.listen(config.port, logger.info(`Server listening on port ${config.port}`)))
    )
  )

  function withLog(middleware: EndedMiddleware): EndedMiddleware {
    return conn =>
      Do(Task.task)
        .bind('res', middleware(conn))
        .bindL('_', ({ res }) =>
          pipe(
            res,
            Either.fold(
              _ => Task.of(undefined),
              ([, _]) => logConnection(logger, _ as ExpressConnection<H.ResponseEnded>)
            )
          )
        )
        .return(({ res }) => res)
  }

  function withTry(middleware: EndedMiddleware): EndedMiddleware {
    return conn =>
      pipe(
        Future.apply(() => middleware(conn)()),
        Task.chain(_ =>
          pipe(
            _,
            Either.fold(
              e =>
                pipe(
                  Task.fromIO(onError(e)),
                  Task.chain(_ => EndedMiddleware.ServerError()(conn))
                ),
              _ => Task.of(_)
            )
          )
        )
      )
  }

  function onError(error: any): IO<void> {
    return error.stack === undefined ? logger.error(error) : logger.error(error.stack)
  }
}

const logConnection = (logger: Logger, conn: ExpressConnection<H.ResponseEnded>): Task<unknown> => {
  const method = conn.getMethod()
  const uri = conn.getOriginalUrl()
  const status = pipe(
    conn,
    getStatus,
    Maybe.fold(
      () => [],
      _ => [_.toString()]
    )
  )
  return pipe(logger.debug(method, uri, '-', ...status), Task.fromIO)
}

const getStatus = (conn: ExpressConnection<H.ResponseEnded>): Maybe<H.Status> =>
  pipe(
    toArray(conn.actions),
    List.findLast(isStatus),
    Maybe.map(_ => _.status)
  )

const isStatus = (a: Action): a is { type: 'setStatus'; status: H.Status } => a.type === 'setStatus'

const errorHandler = (onError: (error: any) => IO<unknown>): ErrorRequestHandler => (
  err,
  _req,
  res,
  _next
) => {
  onError(err)()
  res.status(500).end()
}
