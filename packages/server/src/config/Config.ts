import * as t from 'io-ts'
import { sequenceT } from 'fp-ts/lib/Apply'
import { nonEmptyArray } from 'io-ts-types/lib/nonEmptyArray'

import { IO, pipe, Either, NonEmptyArray, Maybe } from 'main-site-shared/lib/fp'

import { ConfReader, ValidatedNea } from './ConfReader'
import { LogLevelOrOff } from '../models/LogLevel'

/**
 * Config
 */

export interface Config {
  isDev: boolean
  logLevel: LogLevelOrOff
  port: number
  allowedOrigins: Maybe<NonEmptyArray<string>>
  db: DbConfig
}

export function Config(
  isDev: boolean,
  logLevel: LogLevelOrOff,
  port: number,
  allowedOrigins: Maybe<NonEmptyArray<string>>,
  db: DbConfig
): Config {
  return { isDev, logLevel, port, allowedOrigins, db }
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
      reader.read(t.boolean)('isDev'),
      reader.read(LogLevelOrOff.codec)('logLevel'),
      reader.read(t.number)('port'),
      reader.readOpt(nonEmptyArray(t.string))('allowedOrigins'),
      DbConfig.read(reader)
    ),
    Either.map(([isDev, logLevel, port, allowedOrigins, db]) =>
      Config(isDev, logLevel, port, allowedOrigins, db)
    )
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
        reader.read(t.string)('db', 'host'),
        reader.read(t.string)('db', 'dbName'),
        reader.read(t.string)('db', 'user'),
        reader.read(t.string)('db', 'password')
      ),
      Either.map(([host, dbName, user, password]) => DbConfig(host, dbName, user, password))
    )
}
