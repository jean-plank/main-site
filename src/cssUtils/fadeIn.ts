import { keyframes } from '@emotion/core'

const animation = keyframes({
    from: {
        opacity: 0
    },
    to: {
        opacity: 1
    }
})

export default (duration: string): string => `${animation} ${duration} forwards`
