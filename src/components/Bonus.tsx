/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FunctionComponent } from 'react'

import jpgs from '../../img/*.jpg'

import fadeIn from '../utils/css/fadeIn'
import Game from './Game'

const Bonus: FunctionComponent = () => (
    <div css={styles.container}>
        <div css={styles.jp1Container}>
            <Game gameId={'thestory'} jpTitle={'Jean Plank'} image={jpgs.jp1} />
        </div>
    </div>
)
export default Bonus

const styles = {
    container: css({
        height: '100%',
        width: '100%',
        background: `url('${jpgs.old_background}')`,
        backgroundSize: 'cover',
        animation: fadeIn('0.75s')
    }),

    jp1Container: css({
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        animation: fadeIn('1.5s')
    })
}
