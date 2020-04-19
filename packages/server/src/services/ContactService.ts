import { Future, pipe } from 'main-site-shared/lib/fp'

import { PartialLogger } from './Logger'
import { ContactForm } from '../models/ContactForm'
import { ContactPersistence } from '../persistence/ContactPersistence'

export type ContactService = ReturnType<typeof ContactService>

export const ContactService = (Logger: PartialLogger, contactPersistence: ContactPersistence) => {
  const _logger = Logger('ContactService')

  const insertOne = (form: ContactForm): Future<boolean> => contactPersistence.insertOne(form)

  return { insertOne }
}
