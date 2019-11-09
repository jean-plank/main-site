/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FunctionComponent } from 'react'

import jpgs from '../../img/*.jpg'

const Contact: FunctionComponent = () => (
    <div css={styles.container}>
        <img src={jpgs.maintenance} css={styles.image} />
    </div>
)
export default Contact

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
        widht: '50%',
        maxHeight: '50vh',
        objectFit: 'cover'
    })
}
