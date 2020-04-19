import { Future, pipe } from 'main-site-shared/lib/fp'

import { PartialLogger } from './Logger'
import { ContactForm } from '../models/ContactForm'

export type ContactService = ReturnType<typeof ContactService>

export const ContactService = (Logger: PartialLogger) => {
  const logger = Logger('ContactService')

  const create = (form: ContactForm): Future<boolean> =>
    pipe(
      Future.fromIOEither(logger.info('created', form)),
      Future.map(_ => true)
    )

  return { create }
}
