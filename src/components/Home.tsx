/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FunctionComponent } from 'react'

import jpgs from '../../img/*.jpg'

import media from '../utils/media'
import parallaxStyles from '../utils/parallaxStyles'
import Game from './Game'

const Home: FunctionComponent = () => (
    <div css={[parallaxStyles.parallaxLayerBase, styles.main]}>
        <div css={styles.page}>
            <Game gameId='jp2' jpTitle='Jean Plank II' image={jpgs.jp2} />
        </div>
        <div css={styles.page}>
            <Game gameId='jp3' jpTitle='Jean Plank III' image={jpgs.jp3} />
            <Game gameId='jp3b' jpTitle='Jean Plank III' image={jpgs.jp3b} />
        </div>
        <div css={styles.page}>
            <Game gameId='jp4' jpTitle='Jean Plank IV' image={jpgs.jp4} />
            <div css={styles.empty} />
        </div>
    </div>
)
export default Home

const styles = {
    main: css({
        top: 0,

        [media.desktop]: {},
        [media.mobile]: {}
    }),
    page: css({
        width: '100vw',
        display: 'flex',
        justifyContent: 'center'
    }),
    empty: css({
        width: '50%'
    })
}
