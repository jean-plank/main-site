/** @jsx jsx */
import { jsx } from '@emotion/core'
import { AnchorHTMLAttributes, FunctionComponent } from 'react'

export const TargetBlank: FunctionComponent<AnchorHTMLAttributes<HTMLAnchorElement>> = props => {
  const { children, ...withoutChildren } = props
  const overriden = {
    ...withoutChildren,
    target: '_blank',
    rel: 'noopener noreferrer'
  }
  return <a {...overriden}>{children}</a>
}
