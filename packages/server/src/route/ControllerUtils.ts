import * as H from 'hyper-ts'
import express, { Request } from 'express'
import { ExpressConnection } from 'hyper-ts/lib/express'
import { fromRequestHandler } from 'hyper-ts/lib/express'

import { Either, pipe, Future } from 'main-site-shared/lib/fp'

import { EndedMiddleware } from '../models/EndedMiddleware'

export namespace ControllerUtils {
  export const withJsonBody = <A>(decoder: (u: unknown) => Either<unknown, A>) => (
    f: (a: A) => EndedMiddleware
  ): EndedMiddleware =>
    pipe(
      fromRequestHandler(express.json(), _ => undefined),
      H.ichain(_ => H.decodeBody(decoder)),
      H.ichain(f),
      H.orElse(_ => EndedMiddleware.BadRequest())
    )

  export const withRequest: H.Middleware<H.StatusOpen, H.StatusOpen, Error, Request> = (
    conn: H.Connection<H.StatusOpen>
  ) => Future.right([(conn as ExpressConnection<H.StatusOpen>).req, conn])
}
