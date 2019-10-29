/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Fragment, FunctionComponent } from 'react'

import jpgs from '../../img/*.jpg'

import fadeIn from '../utils/css/fadeIn'
import media from '../utils/css/media'
import parallaxStyles from '../utils/css/parallaxStyles'
import params from '../utils/css/params'
import { common, commonV } from '../utils/css/strokeBefore'
import Game from './Game'

const Home: FunctionComponent = () => (
    <Fragment>
        <img
            src={jpgs.background}
            css={[parallaxStyles.parallaxLayerBack, styles.bg]}
        />

        <div css={[parallaxStyles.parallaxLayerBase, styles.main]}>
            <div css={styles.page}>
                <Game
                    gameId='jp2'
                    jpTitle='Jean Plank II'
                    image={jpgs.jp2}
                    css={styles.strokeVBottom}
                />
            </div>
            <div css={[styles.page, styles.strokeH]}>
                <Game
                    gameId='jp3'
                    jpTitle='Jean Plank III'
                    image={jpgs.jp3}
                    css={styles.strokeV}
                />
                <Game
                    gameId='jp3b'
                    jpTitle='Jean Plank III'
                    image={jpgs.jp3b}
                    css={styles.strokeVTop}
                />
            </div>
            <div css={styles.page}>
                <Game
                    gameId='jp4'
                    jpTitle='Jean Plank IV'
                    image={jpgs.jp4}
                    css={styles.strokeVTop}
                />
                <div css={styles.empty} />
            </div>
        </div>
    </Fragment>
)
export default Home

const styles = {
    bg: css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200vh',
        width: '100vw',
        overflow: 'hidden',
        objectFit: 'cover',
        animation: fadeIn('1.5s')
    }),

    main: css({
        top: 0
    }),

    page: css({
        width: '100vw',
        display: 'flex',
        justifyContent: 'center',

        [media.desktop]: {
            scrollSnapAlign: 'start'
        }
    }),

    strokeH: css({
        [media.desktop]: {
            position: 'relative',

            '&::before': {
                ...common,
                borderWidth: `${params.stroke.width} 0 0 0`,
                top: '4px',
                width: `calc(50% - 2 * ${params.stroke.width})`
            }
        }
    }),

    strokeV: css({
        [media.desktop]: {
            '&::before': {
                ...commonV,
                height: `100%`,
                top: `calc(0.1 * ${params.stroke.width})`
            }
        }
    }),

    strokeVTop: css({
        [media.desktop]: {
            '&::before': {
                ...commonV,
                height: `calc(50% - ${params.stroke.width})`,
                top: `calc(0.1 * ${params.stroke.width})`
            }
        }
    }),

    strokeVBottom: css({
        [media.desktop]: {
            '&::before': {
                ...commonV,
                height: `calc(50% - ${params.stroke.width})`,
                bottom: `calc(0.1 * ${params.stroke.width})`
            }
        }
    }),

    empty: css({
        width: '50%'
    })
}