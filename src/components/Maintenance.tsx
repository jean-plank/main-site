/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FunctionComponent } from 'react'

import bgNotFoundJpg from '../../img/bg_not_found.jpg'
import maintenanceJpg from '../../img/maintenance.jpg'

export const Maintenance: FunctionComponent = () => (
  <div css={styles.container}>
    <img src={maintenanceJpg} css={styles.image} />
  </div>
)

const styles = {
  container: css({
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `url('${bgNotFoundJpg}')`,
    backgroundSize: 'cover',
    boxShadow: '0 0 10px black'
  }),

  image: css({
    maxHeight: '50vh'
  })
}
