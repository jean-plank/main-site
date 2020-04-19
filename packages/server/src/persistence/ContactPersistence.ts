import { Collection } from 'mongodb'

import { Future, pipe } from 'main-site-shared/lib/fp'

import { PartialLogger } from '../services/Logger'
import { ContactForm } from '../models/ContactForm'
import { FpCollection } from '../utils/FpCollection'

export type ContactPersistence = ReturnType<typeof ContactPersistence>

export const ContactPersistence = (
  Logger: PartialLogger,
  mongoCollection: (dbName: string) => Future<Collection>
) => {
  const logger = Logger('ContactPersistence')

  const collection = FpCollection(logger, () => mongoCollection('contactForm'), ContactForm.codec)

  // const ensureIndexes = () => collection.ensureIndexes([{ key: { id: -1 }, unique: true }])

  const insertOne = (form: ContactForm): Future<boolean> =>
    pipe(
      collection.insertOne(form),
      Future.map(_ => _.insertedCount === 1)
    )

  return { insertOne }
}
