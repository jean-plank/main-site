import * as t from 'io-ts'
import { sequenceT } from 'fp-ts/lib/Apply'

import { IO, pipe, Either, NonEmptyArray } from 'main-site-shared/lib/fp'

import { ConfReader, ValidatedNea } from './ConfReader'
import { LogLevelOrOff } from '../models/LogLevel'

/**
 * Config
 */

export interface Config {
  logLevel: LogLevelOrOff
  port: number
  db: DbConfig
}

export function Config(logLevel: LogLevelOrOff, port: number, db: DbConfig): Config {
  return { logLevel, port, db }
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

const readConfig = (reader: ConfReader): ValidatedNea<Config> =>
  pipe(
    sequenceT(Either.getValidation(NonEmptyArray.getSemigroup<string>()))(
      reader(LogLevelOrOff.codec)('logLevel'),
      reader(t.number)('port'),
      DbConfig.read(reader)
    ),
    Either.map(([logLevel, port, db]) => Config(logLevel, port, db))
  )

/**
 * DbConfig
 */

interface DbConfig {
  host: string
  dbName: string
  user: string
  password: string
}

export function DbConfig(host: string, dbName: string, user: string, password: string): DbConfig {
  return { host, dbName, user, password }
}

export namespace DbConfig {
  export const read = (reader: ConfReader): ValidatedNea<DbConfig> =>
    pipe(
      sequenceT(Either.getValidation(NonEmptyArray.getSemigroup<string>()))(
        reader(t.string)('db', 'host'),
        reader(t.string)('db', 'dbName'),
        reader(t.string)('db', 'user'),
        reader(t.string)('db', 'password')
      ),
      Either.map(([host, dbName, user, password]) => DbConfig(host, dbName, user, password))
    )
}
