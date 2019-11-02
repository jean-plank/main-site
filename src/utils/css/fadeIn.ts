import { keyframes } from '@emotion/core'

const animation = keyframes({
    from: {
        opacity: 0
    },
    to: {
        opacity: 1
    }
})

export default (duration: string, delay: string = '0s'): string =>
    `${animation} ${duration} ${delay} forwards`
