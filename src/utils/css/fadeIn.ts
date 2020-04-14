import { keyframes } from '@emotion/core'

const animation = keyframes({
  from: {
    opacity: 0
  },
  to: {
    opacity: 1
  }
})

export const fadeIn = (duration: string, delay = '0s'): string =>
  `${animation} ${duration} ${delay} forwards`
