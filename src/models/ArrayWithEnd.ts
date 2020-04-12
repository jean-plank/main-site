import * as O from 'fp-ts/lib/Option'
import * as Nea from 'fp-ts/lib/NonEmptyArray'
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray'
import { Option } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

export type ArrayWithEnd<A, E> = Option<[NonEmptyArray<A>, Option<E>]>

export namespace ArrayWithEnd {
  export const head = <A, E>(awe: ArrayWithEnd<A, E>): Option<A> => O.option.map(awe, ([_]) => _[0])

  export const tail = <A, E>(awe: ArrayWithEnd<A, E>): ArrayWithEnd<A, E> =>
    O.option.chain(awe, ([as, e]) =>
      pipe(
        Nea.tail(as),
        Nea.fromArray,
        O.map(_ => [_, e])
      )
    )

  export const cons = <A, E>(a: A, awe: ArrayWithEnd<A, E>): ArrayWithEnd<A, E> =>
    pipe(
      awe,
      O.fold(
        () => O.some([[a], O.none]),
        ([as, e]) => O.some([Nea.cons(a, as), e])
      )
    )

  export const lastA = <A, E>(awe: ArrayWithEnd<A, E>): Option<A> =>
    O.option.map(awe, ([_]) => Nea.last(_))
}
