import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

export namespace OptionHelpers {
  export const toArray = <A>(option: O.Option<A>): A[] =>
    pipe(
      option,
      O.fold(
        () => [],
        _ => [_]
      )
    )

  export const prettyPrint = <A>(option: O.Option<A>): any[] =>
    pipe(
      option,
      O.fold(
        () => ['none'],
        _ => ['some(', _, ')']
      )
    )
}
