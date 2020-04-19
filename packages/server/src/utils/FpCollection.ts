import * as t from 'io-ts'
import {
  ClientSession,
  Collection,
  FilterQuery,
  InsertOneWriteOpResult,
  FindOneOptions,
  IndexSpecification as MongoIndexSpec
} from 'mongodb'

import { Future, pipe, Maybe, Either } from 'main-site-shared/lib/fp'

import { OptionalId, WithId } from '../models/MongoTypings'
import { Logger } from '../services/Logger'

interface IndexSpecification<A> extends MongoIndexSpec {
  key: {
    [B in keyof A]?: 1 | -1
  }
}

export type FpCollection = ReturnType<typeof FpCollection>
export const FpCollection = <A, O>(
  logger: Logger,
  collection: () => Future<Collection<O>>,
  codec: t.Type<A, OptionalId<O>>
) => {
  const ensureIndexes = (
    indexSpecs: IndexSpecification<A>[],
    options?: { session?: ClientSession }
  ): Future<void> =>
    pipe(
      Future.fromIOEither(logger.debug('ensureIndexes')),
      Future.chain(_ => collection()),
      Future.chain(_ => Future.apply(() => _.createIndexes(indexSpecs, options)))
    )

  const insertOne = (doc: A): Future<InsertOneWriteOpResult<WithId<O>>> =>
    pipe(
      collection(),
      Future.chain(_ => Future.apply(() => _.insertOne(codec.encode(doc))))
    )

  const findOne = (filter: FilterQuery<O>, options?: FindOneOptions): Future<Maybe<A>> =>
    pipe(
      collection(),
      Future.chain(_ => Future.apply(() => _.findOne(filter, options))),
      Future.map(Maybe.fromNullable),
      Future.chain(_ =>
        pipe(
          _,
          Maybe.fold(
            () => Future.right(Maybe.none),
            _ =>
              pipe(
                codec.decode(_),
                Either.map(Maybe.some),
                Either.mapLeft(_ => Error("Couldn't decode value")),
                Future.fromEither
              )
          )
        )
      )
    )

  return { ensureIndexes, insertOne, findOne }
}
