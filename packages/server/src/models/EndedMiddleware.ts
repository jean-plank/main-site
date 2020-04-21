import * as H from 'hyper-ts'

import { pipe } from 'main-site-shared/lib/fp'

export type EndedMiddleware = H.Middleware<H.StatusOpen, H.ResponseEnded, unknown, void>

export function EndedMiddleware(status: H.Status): (message?: string) => EndedMiddleware {
  return (message = '') =>
    pipe(
      H.status(status),
      H.ichain(_ => H.closeHeaders()),
      H.ichain(_ => H.send(message))
    )
}

export namespace EndedMiddleware {
  export const OK = EndedMiddleware(H.Status.OK)
  export const Created = EndedMiddleware(H.Status.Created)
  export const Found = EndedMiddleware(H.Status.Found)
  export const BadRequest = EndedMiddleware(H.Status.BadRequest)
  export const Unauthorized = EndedMiddleware(H.Status.Unauthorized)
  export const Forbidden = EndedMiddleware(H.Status.Forbidden)
  export const NotFound = EndedMiddleware(H.Status.NotFound)
  export const MethodNotAllowed = EndedMiddleware(H.Status.MethodNotAllowed)
  export const NotAcceptable = EndedMiddleware(H.Status.NotAcceptable)
  export const ServerError = EndedMiddleware(H.Status.ServerError)
}
