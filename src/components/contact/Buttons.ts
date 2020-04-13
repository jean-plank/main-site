import styled from '@emotion/styled'

import { fontFamily } from '../../utils/css/fonts'
import { CSSObject } from '@emotion/core'

export namespace Buttons {
  export const Primary = styled.button(common(), {
    backgroundColor: '#b59458',
    color: '#f6f0cd',
    borderColor: '#b59458',

    '&::after': {
      borderColor: '#f6f0cd'
    }
  })

  export const Default = styled.button(common(), {
    backgroundColor: '#f6f0cd',
    color: '#4a3b20',
    borderColor: '#b59458',

    '&::after': {
      borderColor: '#4a3b20'
    }
  })
}

function common(): CSSObject {
  return {
    fontFamily: fontFamily.baloopaaji2,
    fontSize: '0.8em',
    padding: '0.3em 0.5em',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    lineHeight: 1,
    border: '4px solid',
    transition: 'all 0.2s',

    '&:not([disabled])': {
      cursor: 'pointer',
      boxShadow: '0 0 8px -4px black'
    },

    '&[disabled]': {
      opacity: '0.5'
    },

    '&::after': {
      content: `''`,
      position: 'absolute',
      bottom: '0.2em',
      left: '0.5em',
      width: 'calc(100% - 1em)',
      border: '1px solid',
      borderWidth: '1px 0',
      borderRadius: '50%',
      opacity: 0,
      transition: 'all 0.2s'
    },

    '&:not([disabled]):hover::after': {
      opacity: 1
    }
  }
}
