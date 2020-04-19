import * as H from 'hyper-ts'
import express from 'express'
import { fromRequestHandler } from 'hyper-ts/lib/express'

import { pipe, Either } from 'main-site-shared/lib/fp'
import { FormPayload } from 'main-site-shared/lib/models/form/FormPayload'

import { EndedMiddleware } from '../models/EndedMiddleware'
import { ContactService } from '../services/ContactService'
import { PartialLogger } from '../services/Logger'

export type ContactController = ReturnType<typeof ContactController>

export const ContactController = (Logger: PartialLogger, contactService: ContactService) => {
  const _logger = Logger('ContactController')

  const submitForm: EndedMiddleware = withJsonBody(FormPayload.codec.decode)(form =>
    pipe(
      contactService.create(form),
      _ => H.fromTaskEither<H.StatusOpen, unknown, boolean>(_),
      H.ichain(created => (created ? EndedMiddleware.OK() : EndedMiddleware.BadRequest()))
    )
  )

  return { submitForm }
}

const withJsonBody = <A>(decoder: (u: unknown) => Either<unknown, A>) => (
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
