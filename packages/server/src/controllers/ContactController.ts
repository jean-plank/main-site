import * as H from 'hyper-ts'

import { pipe } from 'main-site-shared/lib/fp'
import { FormPayload } from 'main-site-shared/lib/models/form/FormPayload'

import { EndedMiddleware } from '../models/EndedMiddleware'
import { ContactService } from '../services/ContactService'
import { PartialLogger } from '../services/Logger'
import { ControllerUtils } from '../utils/ControllerUtils'

export type ContactController = ReturnType<typeof ContactController>

export const ContactController = (Logger: PartialLogger, contactService: ContactService) => {
  const _logger = Logger('ContactController')

  const submitForm: EndedMiddleware = ControllerUtils.withJsonBody(FormPayload.codec.decode)(
    (form, { ip }) =>
      pipe(
        contactService.insertOne({ date: new Date(Date.now()), ip, ...form }),
        _ => H.fromTaskEither<H.StatusOpen, unknown, boolean>(_),
        H.ichain(created => (created ? EndedMiddleware.OK() : EndedMiddleware.BadRequest()))
      )
  )

  return { submitForm }
}
