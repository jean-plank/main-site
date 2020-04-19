import * as H from 'hyper-ts'
import * as TE from 'fp-ts/lib/TaskEither'
import express, { RequestHandler, ErrorRequestHandler } from 'express'
import { toRequestHandler, ExpressConnection, toArray, Action } from 'hyper-ts/lib/express'

import { Do, pipe, IO, Task, Either, List, Maybe, Try, Future, todo } from 'main-site-shared/lib/fp'

import { Context } from './Context'
import { Config } from './config/Config'
import { EndedMiddleware } from './models/EndedMiddleware'
import { PartialLogger } from './services/Logger'

export const Application = (config: Config): IO<unknown> => {
  const { Logger, routes } = Context(config)

  const logger = Logger('App')

  return pipe(
    IO.apply(() => express()),
    _ =>
      routes.reduce(
        (ioApp, [method, path, middleware]) =>
          pipe(
            ioApp,
            IO.chain(app =>
              IO.apply(() =>
                app[method](path, pipe(middleware, withTry, withLog, toRequestHandler))
              )
            )
          ),
        _
      ),
    IO.chain(_ =>
      IO.apply(() => _.use(pipe(EndedMiddleware.NotFound(), withLog, toRequestHandler)))
    ),
    IO.chain(_ => IO.apply(() => _.use(errorHandler(onError)))),
    IO.chain(_ =>
      IO.apply(() => _.listen(config.port, logger.info(`Server listening on port ${config.port}`)))
    )
  )

  function withTry(middleware: EndedMiddleware): EndedMiddleware {
    const tryMiddleware: H.Middleware<H.StatusOpen, H.StatusOpen, unknown, Try<void>> = conn =>
      pipe(
        middleware(conn),
        Future.apply,
        Task.map(_ =>
          pipe(
            _,
            Either.fold<
              Error,
              Either<unknown, [void, H.Connection<H.ResponseEnded>]>,
              Either<unknown, [Try<void>, H.Connection<H.StatusOpen>]>
            >(
              e => Either.right([Either.left(e), conn]),
              _ => Either.either.map(_, ([_]) => [Either.right(_), conn])
            )
          )
        )
      )

    return pipe(
      tryMiddleware,
      H.ichain(_ =>
        pipe(
          _,
          Either.fold(
            e =>
              pipe(
                H.fromIOEither(onError(e)),
                H.ichain(_ => EndedMiddleware.ServerError())
              ),
            _ => middleware
          )
        )
      )
    )
  }

  function withLog(middleware: EndedMiddleware): EndedMiddleware {
    return conn =>
      Do(Task.task)
        .bind('res', middleware(conn))
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

  function onError(error: any): IO<void> {
    return error.stack === undefined ? logger.error(error) : logger.error(error.stack)
  }
}

function errorHandler(onError: (error: any) => IO<unknown>): ErrorRequestHandler {
  return (err, _req, res, _next) => {
    onError(err)()
    res.status(500).end()
  }
}

const getStatus = (conn: ExpressConnection<H.ResponseEnded>): Maybe<H.Status> =>
  pipe(
    toArray(conn.actions),
    List.findLast(isStatus),
    Maybe.map(_ => _.status)
  )

const isStatus = (a: Action): a is { type: 'setStatus'; status: H.Status } => a.type === 'setStatus'
