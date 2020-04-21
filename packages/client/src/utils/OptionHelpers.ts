import { pipe, Maybe } from 'main-site-shared/lib/fp'

export namespace OptionHelpers {
  export const toArray = <A>(option: Maybe<A>): A[] =>
    pipe(
      option,
      Maybe.fold(
        () => [],
        _ => [_]
      )
    )

  export const prettyPrint = <A>(option: Maybe<A>): any[] =>
    pipe(
      option,
      Maybe.fold(
        () => ['none'],
        _ => ['some(', _, ')']
      )
    )
}
