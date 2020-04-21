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
      fromRequestHandler(express.json(), ({ ip }) => ({ ip })),
      H.ichain(req =>
        pipe(
          H.decodeBody(decoder),
          H.map<A, [A, Request]>(_ => [_, req])
        )
      ),
      H.ichain(([a, req]) => f(a, req)),
      H.orElse(_ => EndedMiddleware.BadRequest())
    )
}

interface Request {
  ip: string
}
