import * as H from 'hyper-ts'
import express from 'express'
import { fromRequestHandler } from 'hyper-ts/lib/express'

import { Either, pipe } from 'main-site-shared/lib/fp'

import { EndedMiddleware } from '../models/EndedMiddleware'

export namespace ControllerUtils {
  export const withJsonBody = <A>(decoder: (u: unknown) => Either<unknown, A>) => (
    f: (a: A, req: Request) => EndedMiddleware
  ): EndedMiddleware =>
    pipe(
      fromRequestHandler(express.json(), req => req),
      H.ichain(req =>
        pipe(
          H.decodeBody(decoder),
          H.map<A, [A, Request]>(_ => [_, { ip: req.ip }])
        )
      ),
      H.ichain(([a, req]) => f(a, req)),
      H.orElse(_ =>
        pipe(
          H.status(H.Status.BadRequest),
          H.ichain(_ => H.closeHeaders()),
          H.ichain(_ => H.send(''))
        )
      )
    )
}

interface Request {
  ip: string
}
