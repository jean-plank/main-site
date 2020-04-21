import { Newtype, iso } from 'newtype-ts'

export type MsDuration = Newtype<{ readonly MsDuration: unique symbol }, number>

const isoMsDuration = iso<MsDuration>()

export namespace MsDuration {
  export const wrap = isoMsDuration.wrap
  export const unwrap = isoMsDuration.unwrap

  export const seconds = (n: number) => wrap(1000 * n)
  export const minutes = (n: number) => seconds(60 * n)
  export const hours = (n: number) => minutes(60 * n)
  export const days = (n: number) => hours(24 * n)
}
