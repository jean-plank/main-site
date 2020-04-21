import * as H from 'hyper-ts'
import { IncomingHttpHeaders } from 'http'

import { Maybe, pipe, List } from 'main-site-shared/lib/fp'

import { ControllerUtils } from './ControllerUtils'
import { Config } from '../config/Config'
import { EndedMiddleware } from '../models/EndedMiddleware'
import { PartialLogger } from '../services/Logger'

export type WithIp = (cause: string) => (f: (ip: string) => EndedMiddleware) => EndedMiddleware

export const WithIp = (Logger: PartialLogger, config: Config): WithIp => cause => f => {
  const logger = Logger('WithIp')

  return pipe(
    ControllerUtils.withRequest,
    H.map(req =>
      pipe(
        extractHeader('x-forwarded-for', req.headers),
        Maybe.alt(() => extractHeader('remote-address', req.headers)),
        Maybe.alt(() => extractHeader('x-real-ip', req.headers)),
        Maybe.alt(() => (config.isDev ? Maybe.some(req.ip) : Maybe.none))
      )
    ),
    H.ichain(_ =>
      pipe(
        _,
        Maybe.fold(
          () =>
            pipe(
              logger.error(`Request rejected because ip is required for ${cause}`),
              H.fromIOEither,
              H.ichain(_ => EndedMiddleware.BadRequest())
            ),
          f
        )
      )
    )
  )
}

const extractHeader = (name: string, headers: IncomingHttpHeaders): Maybe<string> =>
  pipe(Maybe.fromNullable(headers[name]), Maybe.chain(headerToString))

const headerToString = (header: string | string[]): Maybe<string> =>
  Array.isArray(header)
    ? List.isEmpty(header)
      ? Maybe.none
      : Maybe.some(header.join(';'))
    : Maybe.some(header)
