import * as H from 'hyper-ts'
import * as t from 'io-ts'
import express from 'express'
import { fromRequestHandler } from 'hyper-ts/lib/express'
import { failure } from 'io-ts/lib/PathReporter'

import { pipe } from 'main-site-shared/lib/fp'

import { ContactController } from './controllers/ContactController'
import { Route } from './models/Route'

export const Routes = (contactController: ContactController): Route[] => [
  ['get', '/hello/', hello],
  ['get', '/hello/:name', helloName],
  ['post', '/contact', contactController.submitForm]
]

const hello: H.Middleware<H.StatusOpen, H.ResponseEnded, never, void> = pipe(
  H.status(H.Status.OK), // writes the response status
  H.ichain(() => H.closeHeaders()), // tells hyper-ts that we're done with the headers
  H.ichain(() => H.send('Hello.')) // sends the response as text
)

const helloName = pipe(
  fromRequestHandler(express.text(), _ => undefined),
  H.ichain(_ => H.decodeParam('name', t.string.decode)),
  H.mapLeft(e => `invalid param: ${failure(e).join('\n')}`),
  H.ichain(name =>
    pipe(
      H.status<string>(H.Status.OK),
      H.ichain(_ => H.closeHeaders()),
      H.ichain(_ => H.send(`Hello, ${name}.`))
    )
  ),
  H.orElse(msg =>
    pipe(
      H.status(H.Status.BadRequest),
      H.ichain(_ => H.closeHeaders()),
      H.ichain(_ => H.send(msg))
    )
  )
)
