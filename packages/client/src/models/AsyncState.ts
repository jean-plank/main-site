import { ReactNode } from 'react'

export type AsyncState<A> = AsyncState.Loading | AsyncState.Error | AsyncState.Success<A>

export namespace AsyncState {
  export interface Loading {
    readonly _tag: 'Loading'
  }
  export const Loading: AsyncState<never> = { _tag: 'Loading' }
  export const isLoading = <A>(state: AsyncState<A>): state is Loading => state._tag === 'Loading'

  export interface Error {
    readonly _tag: 'Error'
    readonly message: ReactNode
  }
  export const Error = (message: ReactNode): AsyncState<never> => ({ _tag: 'Error', message })
  export const isError = <A>(state: AsyncState<A>): state is Error => state._tag === 'Error'

  export interface Success<A> {
    readonly _tag: 'Success'
    readonly value: A
  }
  export const Success = <A>(value: A): AsyncState<A> => ({ _tag: 'Success', value })

  interface FoldArgs<A, B> {
    onLoading: () => B
    onError: (message: ReactNode) => B
    onSuccess: (a: A) => B
  }
  export const fold = <A, B>({ onLoading, onError, onSuccess }: FoldArgs<A, B>) => (
    state: AsyncState<A>
  ): B => {
    switch (state._tag) {
      case 'Loading':
        return onLoading()
      case 'Error':
        return onError(state.message)
      case 'Success':
        return onSuccess(state.value)
    }
  }
}
