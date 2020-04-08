/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FunctionComponent } from 'react'

import jpgs from '../../img/*.jpg'

export const Maintenance: FunctionComponent = () => (
  <div css={styles.container}>
    <img src={jpgs.maintenance} css={styles.image} />
  </div>
)

const styles = {
  container: css({
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `url('${jpgs.bg_not_found}')`,
    backgroundSize: 'cover',
    boxShadow: '0 0 10px black'
  }),

  image: css({
    maxHeight: '50vh'
  })
}
