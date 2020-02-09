import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'

export const OptionHelpers = {
    toArray,
    prettyPrint
}

function toArray<A>(option: O.Option<A>): A[] {
    return pipe(
        option,
        O.fold(
            () => [],
            _ => [_]
        )
    )
}

function prettyPrint<A>(option: O.Option<A>): any[] {
    return pipe(
        option,
        O.fold(
            () => ['none'],
            _ => ['some(', _, ')']
        )
    )
}
