import * as t from 'io-ts'

import {
  Either,
  pipe,
  IO,
  Maybe,
  Do,
  List,
  unknownToError,
  NonEmptyArray
} from 'main-site-shared/lib/fp'

import { FileUtils } from '../utils/FileUtils'

export type ValidatedNea<A> = Either<NonEmptyArray<string>, A>

export interface ConfReader {
  read: <A>(codec: t.Decoder<unknown, A>) => (path: string, ...paths: string[]) => ValidatedNea<A>
  readOpt: <A>(
    codec: t.Decoder<unknown, A>
  ) => (path: string, ...paths: string[]) => ValidatedNea<Maybe<A>>
}

export namespace ConfReader {
  export const fromFiles = (path: string, ...paths: string[]): IO<ConfReader> =>
    pipe(
      parseJsonFiles(path, ...paths),
      IO.map<NonEmptyArray<unknown>, ConfReader>(jsons =>
        fromJsons(NonEmptyArray.head(jsons), ...NonEmptyArray.tail(jsons))
      )
    )

  export const fromJsons = (json: unknown, ...jsons: unknown[]): ConfReader => {
    const read = <A>(codec: t.Decoder<unknown, A>) => (
      path: string,
      ...paths: string[]
    ): ValidatedNea<A> =>
      pipe(
        readOpt(codec)(path, ...paths),
        Either.chain(_ =>
          pipe(
            _,
            Maybe.fold(() => Either.left(NonEmptyArray.of('missing key')), Either.right)
          )
        )
      )

    const readOpt = <A>(codec: t.Decoder<unknown, A>) => (
      path: string,
      ...paths: string[]
    ): ValidatedNea<Maybe<A>> => {
      const allPaths: NonEmptyArray<string> = [path, ...paths]

      const valueForPath = pipe(
        jsons,
        List.reduce(readPath(allPaths, json), (acc, json) =>
          pipe(
            acc,
            Maybe.alt(() => readPath(allPaths, json))
          )
        )
      )

      return pipe(
        valueForPath,
        Maybe.fold(() => Either.right(Maybe.none), decodeVal)
      )

      function decodeVal(val: unknown): ValidatedNea<Maybe<A>> {
        return pipe(
          codec.decode(val),
          Either.mapLeft(
            errors =>
              errors.map(
                _ => `expected ${codec.name} got ${JSON.stringify(_.value)}`
              ) as NonEmptyArray<string>
          ),
          Either.map(Maybe.some),
          Either.mapLeft(NonEmptyArray.map(_ => `key ${allPaths.join('.')}: ${_}`))
        )
      }
    }

    return { read, readOpt }
  }
}

const parseJsonFiles = (path: string, ...paths: string[]): IO<NonEmptyArray<unknown>> =>
  paths.reduce(
    (acc, path) =>
      Do(IO.ioEither)
        .bindL('acc', () => acc)
        .bindL('newConf', () => loadConfigFile(path))
        .return(({ acc, newConf }) => NonEmptyArray.snoc(acc, newConf)),
    pipe(loadConfigFile(path), IO.map(NonEmptyArray.of))
  )

const loadConfigFile = (path: string): IO<unknown> =>
  pipe(
    FileUtils.readFileSync(path),
    IO.chain(_ => IO.fromEither(Either.parseJSON(_, unknownToError)))
  )

const readPath = (paths: string[], val: unknown): Maybe<unknown> => {
  if (List.isEmpty(paths)) return Maybe.some(val)

  const [head, ...tail] = paths
  return pipe(
    Maybe.tryCatch(() => (val as any)[head]),
    Maybe.filter(_ => _ !== undefined),
    Maybe.chain(newVal => readPath(tail, newVal))
  )
}
