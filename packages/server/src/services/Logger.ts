import util from 'util'
import fmt from 'dateformat'

import { IO } from 'main-site-shared/lib/fp'

import { LogLevel, LogLevelOrOff } from '../models/LogLevel'

export type Logger = Record<LogLevel, (arg: any, ...args: any[]) => IO<void>>

export type PartialLogger = (name: string) => Logger

export const PartialLogger = (logLevel: LogLevelOrOff): PartialLogger => name => {
  const log = (lvl: LogLevel, msg: string): IO<void> =>
    shouldLog(lvl) ? IO.apply(() => console.log(format(name, lvl, msg))) : IO.right(undefined)

  const debug = (format: any, ...param: any[]) => log('debug', util.format(format, ...param))
  const info = (format: any, ...param: any[]) => log('info', util.format(format, ...param))
  const warn = (format: any, ...param: any[]) => log('warn', util.format(format, ...param))
  const error = (format: any, ...param: any[]) => log('error', util.format(format, ...param))

  return { debug, info, warn, error }

  function shouldLog(lvl: LogLevel): boolean {
    return LogLevelOrOff.value[logLevel] >= LogLevelOrOff.value[lvl]
  }
}

function format(name: string, level: LogLevel, msg: string): string {
  const withName = `${name} - ${msg}`
  const withTimestamp = `${color(fmt('yyyy/mm/dd HH:MM:ss'), '30;1')} ${withName}`
  const c = LogLevel.color[level]
  return level === 'info' || level === 'warn'
    ? `[${color(level.toUpperCase(), c)}]  ${withTimestamp}`
    : `[${color(level.toUpperCase(), c)}] ${withTimestamp}`
}

function color(s: string, c: string): string {
  return process.stdout.isTTY ? `\x1B[${c}m${s}\x1B[0m` : s
}
