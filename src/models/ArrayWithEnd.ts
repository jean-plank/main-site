import * as O from 'fp-ts/lib/Option'
import * as Nea from 'fp-ts/lib/NonEmptyArray'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { Option } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

export type ArrayWithEnd<A, B> = Option<{
  init: NonEmptyArray<A>
  last: Option<B>
}>

export namespace ArrayWithEnd {
  export const none: ArrayWithEnd<never, never> = O.none
  export const some = <A, B>(
    init: NonEmptyArray<A>,
    last: Option<B> = O.none
  ): ArrayWithEnd<A, B> => O.some({ init, last })

  export const head = <A, B>(awe: ArrayWithEnd<A, B>): Option<A> =>
    O.option.map(awe, _ => _.init[0])

  export const tail = <A, B>(awe: ArrayWithEnd<A, B>): ArrayWithEnd<A, B> =>
    O.option.chain(awe, a =>
      pipe(
        Nea.tail(a.init),
        Nea.fromArray,
        O.chain(_ => some(_, a.last))
      )
    )

  export const last = <A, B>(awe: ArrayWithEnd<A, B>): Option<B> => O.option.chain(awe, _ => _.last)

  export const lastA = <A, B>(awe: ArrayWithEnd<A, B>): Option<A> =>
    O.option.map(awe, _ => Nea.last(_.init))

  export const cons = <A, B>(a: A, awe: ArrayWithEnd<A, B>): ArrayWithEnd<A, B> =>
    pipe(
      awe,
      O.fold(
        () => some([a]),
        _ => some(Nea.cons(a, _.init), _.last)
      )
    )
}
