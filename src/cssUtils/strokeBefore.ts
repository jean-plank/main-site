import { Interpolation } from '@emotion/css'

import params from './params'

export const common: Record<string, Interpolation> = {
    content: `''`,
    borderStyle: 'dotted',
    borderColor: params.stroke.color,
    position: 'absolute'
}

export const commonV: Record<string, Interpolation> = {
    ...common,
    borderWidth: `0 0 0 ${params.stroke.width}`
}
