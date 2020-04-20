import * as H from 'hyper-ts'
import express from 'express'
import { fromRequestHandler } from 'hyper-ts/lib/express'
import { isDeepStrictEqual } from 'util'

import { pipe, List, Maybe } from 'main-site-shared/lib/fp'

import { EndedMiddleware } from '../models/EndedMiddleware'
import { MsDuration } from '../models/MsDuration'
import { PartialLogger } from '../services/Logger'

export type RateLimiter = ReturnType<typeof RateLimiter>

export const RateLimiter = (Logger: PartialLogger, lifeTime: MsDuration) => {
  const logger = Logger('RateLimiter')

  let requests: History[] = []

  setTimeout(() => {
    requests = []
    console.log('resetted map')
  }, MsDuration.unwrap(lifeTime))

  const limit = (limit: number, window: MsDuration) => (
    middleware: EndedMiddleware
  ): EndedMiddleware =>
    pipe(
      fromRequestHandler(express.text({ type: '*/*' }), req => req),
      H.ichain(({ path, ip }) => {
        const key = Key(path, ip)
        const now = Date.now()
        const windowStart = now - MsDuration.unwrap(window)

        const [newRequests, result]: [History[], EndedMiddleware] = pipe(
          requests,
          List.findIndex(_ => isDeepStrictEqual(_.key, key)),
          Maybe.fold(
            () => [[History(key, [now])], middleware],
            i => {
              const { history } = requests[i]
              const cleaned = history.filter(_ => _ > windowStart)

              if (cleaned.length >= limit) {
                const res = pipe(
                  logger.warn(`Too many request on route "${path}" with ip "${ip}"`),
                  H.fromIOEither,
                  H.ichain(_ => EndedMiddleware.Unauthorized('Too many requests'))
                )
                return [requests, res]
              }

              const newHistory = History(key, List.snoc(cleaned, now))
              return [List.unsafeUpdateAt(i, newHistory, requests), middleware]
            }
          )
        )

        requests = newRequests
        return result
      })
    )

  return { limit }
}

interface History {
  key: Key
  history: number[]
}
const History = (key: Key, history: number[]): History => ({ key, history })

interface Key {
  path: string
  ip: string
}
const Key = (path: string, ip: string): Key => ({ path, ip })
