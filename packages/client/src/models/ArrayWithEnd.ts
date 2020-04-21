import { Maybe, pipe, NonEmptyArray } from 'main-site-shared/lib/fp'

export type ArrayWithEnd<A, B> = Maybe<{
  init: NonEmptyArray<A>
  last: Maybe<B>
}>

export namespace ArrayWithEnd {
  export const none: ArrayWithEnd<never, never> = Maybe.none
  export const some = <A, B>(
    init: NonEmptyArray<A>,
    last: Maybe<B> = Maybe.none
  ): ArrayWithEnd<A, B> => Maybe.some({ init, last })

  export const head = <A, B>(awe: ArrayWithEnd<A, B>): Maybe<A> =>
    Maybe.option.map(awe, _ => _.init[0])

  export const tail = <A, B>(awe: ArrayWithEnd<A, B>): ArrayWithEnd<A, B> =>
    Maybe.option.chain(awe, a =>
      pipe(
        NonEmptyArray.tail(a.init),
        NonEmptyArray.fromArray,
        Maybe.chain(_ => some(_, a.last))
      )
    )

  export const last = <A, B>(awe: ArrayWithEnd<A, B>): Maybe<B> =>
    Maybe.option.chain(awe, _ => _.last)

  export const lastA = <A, B>(awe: ArrayWithEnd<A, B>): Maybe<A> =>
    Maybe.option.map(awe, _ => NonEmptyArray.last(_.init))

  export const cons = <A, B>(a: A, awe: ArrayWithEnd<A, B>): ArrayWithEnd<A, B> =>
    pipe(
      awe,
      Maybe.fold(
        () => some([a]),
        _ => some(NonEmptyArray.cons(a, _.init), _.last)
      )
    )
}
