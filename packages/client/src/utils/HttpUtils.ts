import { Future } from 'main-site-shared/lib/fp'

export namespace HttpUtils {
  export const post = (url: string, data: any, headers: Record<string, string> = {}) =>
    Future.apply(() =>
      fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: JSON.stringify(data)
      })
    )
}
