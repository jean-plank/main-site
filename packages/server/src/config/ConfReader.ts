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

export type ConfReader = <A>(
  codec: t.Decoder<unknown, A>
) => (path: string, ...paths: string[]) => ValidatedNea<A>

export namespace ConfReader {
  export function fromFiles(path: string, ...paths: string[]): IO<ConfReader> {
    return pipe(
      parseJsonFiles(path, ...paths),
      IO.map<NonEmptyArray<unknown>, ConfReader>(jsons =>
        fromJsons(NonEmptyArray.head(jsons), ...NonEmptyArray.tail(jsons))
      )
    )
  }

  export function fromJsons(json: unknown, ...jsons: unknown[]): ConfReader {
    return <A>(codec: t.Decoder<unknown, A>) => (
      path: string,
      ...paths: string[]
    ): ValidatedNea<A> => {
      const allPaths: NonEmptyArray<string> = [path, ...paths]

      const valueForPath = pipe(
        jsons.reduce<Maybe<unknown>>(
          (acc, json) =>
            pipe(
              acc,
              Maybe.alt(() => readPath(allPaths, json))
            ),
          readPath(allPaths, json)
        ),
        Either.fromOption(() => NonEmptyArray.of('missing key'))
      )

      return pipe(
        valueForPath,
        Either.chain(val =>
          pipe(
            codec.decode(val),
            Either.mapLeft(
              errors =>
                errors.map(
                  _ => `expected ${codec.name} got ${JSON.stringify(_.value)}`
                ) as NonEmptyArray<string>
            )
          )
        ),
        Either.mapLeft(NonEmptyArray.map(_ => `key ${allPaths.join('.')}: ${_}`))
      )
    }
  }
}

function parseJsonFiles(path: string, ...paths: string[]): IO<NonEmptyArray<unknown>> {
  return paths.reduce(
    (acc, path) =>
      Do(IO.ioEither)
        .bindL('acc', () => acc)
        .bindL('newConf', () => loadConfigFile(path))
        .return(({ acc, newConf }) => NonEmptyArray.snoc(acc, newConf)),
    pipe(loadConfigFile(path), IO.map(NonEmptyArray.of))
  )
}

function loadConfigFile(path: string): IO<unknown> {
  return pipe(
    FileUtils.readFileSync(path),
    IO.chain(_ => IO.fromEither(Either.parseJSON(_, unknownToError)))
  )
}

function readPath(paths: string[], val: unknown): Maybe<unknown> {
  if (List.isEmpty(paths)) return Maybe.some(val)

  const [head, ...tail] = paths
  return pipe(
    Maybe.tryCatch(() => (val as any)[head]),
    Maybe.filter(_ => _ !== undefined),
    Maybe.chain(newVal => readPath(tail, newVal))
  )
}
