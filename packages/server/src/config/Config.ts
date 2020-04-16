import * as t from 'io-ts'
import { sequenceT } from 'fp-ts/lib/Apply'

import { IO, pipe, Either, NonEmptyArray } from 'main-site-shared/lib/fp'

import { ConfReader, ValidatedNea } from './ConfReader'
import { LogLevelOrOff } from '../models/LogLevel'

export interface Config {
  logLevel: LogLevelOrOff
  port: number
}
export function Config(logLevel: LogLevelOrOff, port: number): Config {
  return { logLevel, port }
}

export namespace Config {
  export function load(): IO<Config> {
    return pipe(
      ConfReader.fromFiles('./conf/local.conf.json', './conf/application.conf.json'),
      IO.chain(reader =>
        pipe(
          readConfig(reader),
          Either.mapLeft(errors => new Error(`Errors while reading config:\n${errors.join('\n')}`)),
          IO.fromEither
        )
      )
    )
  }
}

function readConfig(reader: ConfReader): ValidatedNea<Config> {
  return pipe(
    sequenceT(Either.getValidation(NonEmptyArray.getSemigroup<string>()))(
      reader(LogLevelOrOff.codec)('logLevel'),
      reader(t.number)('port')
    ),
    Either.map(([logLevel, port]) => Config(logLevel, port))
  )
}
