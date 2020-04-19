import * as H from 'hyper-ts'
import express from 'express'
import { fromRequestHandler } from 'hyper-ts/lib/express'

import { Either, pipe } from 'main-site-shared/lib/fp'

import { EndedMiddleware } from '../models/EndedMiddleware'

export namespace ControllerUtils {
  export const withJsonBody = <A>(decoder: (u: unknown) => Either<unknown, A>) => (
    f: (a: A) => EndedMiddleware
  ): EndedMiddleware =>
    pipe(
      fromRequestHandler(express.json(), _ => undefined),
      H.ichain(_ => H.decodeBody(decoder)),
      H.ichain(f),
      H.orElse(_ =>
        pipe(
          H.status(H.Status.BadRequest),
          H.ichain(_ => H.closeHeaders()),
          H.ichain(_ => H.send(''))
        )
      )
    )
}
