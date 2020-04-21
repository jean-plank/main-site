import * as H from 'hyper-ts'

import { pipe } from 'main-site-shared/lib/fp'
import { FormPayload } from 'main-site-shared/lib/models/form/FormPayload'

import { ControllerUtils } from '../route/ControllerUtils'
import { EndedMiddleware } from '../models/EndedMiddleware'
import { WithIp } from '../route/WithIp'
import { ContactService } from '../services/ContactService'
import { PartialLogger } from '../services/Logger'

export type ContactController = ReturnType<typeof ContactController>

export const ContactController = (
  Logger: PartialLogger,
  withIp: WithIp,
  contactService: ContactService
) => {
  const _logger = Logger('ContactController')

  const submitForm: EndedMiddleware = withIp('ContactController.submitForm')(ip =>
    ControllerUtils.withJsonBody(FormPayload.codec.decode)(form =>
      pipe(
        contactService.insertOne({ date: new Date(), ip, ...form }),
        H.fromTaskEither,
        H.ichain(created => (created ? EndedMiddleware.OK() : EndedMiddleware.BadRequest()))
      )
    )
  )

  return { submitForm }
}
