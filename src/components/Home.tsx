/** @jsx jsx */
import { css, jsx, ObjectInterpolation, SerializedStyles } from '@emotion/core'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { Fragment, FunctionComponent, ReactNode, useState } from 'react'

import jpgs from '../../img/*.jpg'

import fadeIn from '../utils/css/fadeIn'
import media from '../utils/css/media'
import parallaxStyles from '../utils/css/parallax'
import params from '../utils/css/params'
import { common, commonV } from '../utils/css/strokeBefore'
import { AngleDown, AngleUp } from '../utils/svg'
import Game from './Game'
import SiteMap from './SiteMap'

const Home: FunctionComponent = () => {
    const [pages, setPages] = useState<O.Option<HTMLElement[]>>(O.none)

    const onMount = (elt: HTMLElement | null) => {
        if (elt !== null && O.isNone(pages)) {
            const res = Array.from(elt.children).filter(
                _ => _ instanceof HTMLElement
            ) as HTMLElement[]
            setPages(O.some(res))
        }
    }

    return (
        <Fragment>
            <img
                src={jpgs.background}
                css={[parallaxStyles.parallaxLayerBack, styles.bg]}
            />

            <div
                ref={onMount}
                css={[parallaxStyles.parallaxLayerBase, styles.main]}
            >
                <div id='jp2' css={styles.page}>
                    <Game
                        gameId='jp2'
                        jpTitle='Jean Plank II'
                        image={jpgs.jp2}
                        footer={
                            <Fragment>
                                {arrow('desktop', 'down')('#jp3')}
                                {arrow('mobile', 'down')('#jp3a')}
                            </Fragment>
                        }
                        style={{
                            container: styles.strokeVBottom,
                            game: styles.reverse
                        }}
                    />
                </div>
                <div id='jp3' css={[styles.page, styles.strokeH]}>
                    <Game
                        id='jp3a'
                        gameId='jp3'
                        jpTitle='Jean Plank III'
                        image={jpgs.jp3}
                        header={arrow('mobile', 'up')('#jp2')}
                        footer={
                            <Fragment>
                                {arrow('desktop', 'down')('#jp4')}
                                {arrow('mobile', 'down')('#jp3b')}
                            </Fragment>
                        }
                        style={{ container: styles.strokeV }}
                    />
                    <Game
                        id='jp3b'
                        gameId='jp3b'
                        jpTitle='Jean Plank III'
                        image={jpgs.jp3b}
                        header={arrow('mobile', 'up')('#jp3a')}
                        footer={arrow('mobile', 'down')('#jp4')}
                        style={{
                            container: styles.strokeVTop,
                            game: styles.reverse
                        }}
                    />
                </div>
                <div id='jp4' css={styles.page}>
                    <Game
                        gameId='jp4'
                        jpTitle='Jean Plank IV'
                        image={jpgs.jp4}
                        header={arrow('mobile', 'up')('#jp3b')}
                        style={{ container: styles.strokeVTop }}
                    />
                    <div css={styles.empty} />
                </div>
            </div>

            {pipe(
                pages,
                // tslint:disable-next-line: jsx-key
                O.map(_ => <SiteMap sections={_} />),
                O.toNullable
            )}
        </Fragment>
    )
}
export default Home

type Media = 'desktop' | 'mobile'
type Direction = 'up' | 'down'

const arrow = (media: Media, direction: Direction) => (
    to: string
): ReactNode => {
    const Arrow = direction === 'up' ? AngleUp : AngleDown
    return (
        <a href={to} css={arrowsStyles[media][direction]}>
            <Arrow />
        </a>
    )
}

const styles = {
    bg: css({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '200vh',
        width: '100%',
        overflow: 'hidden',
        objectFit: 'cover',
        animation: fadeIn('1.5s'),

        [media.mobile]: {
            height: '300vh'
        }
    }),

    main: css({
        top: 0
    }),

    page: css({
        width: '100%',
        display: 'flex',
        justifyContent: 'center',

        [media.desktop]: {
            scrollSnapAlign: 'start'
        },

        [media.mobile]: {
            flexDirection: 'column'
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
                height: `calc(100% + 0.25 * ${params.stroke.width})`
            }
        }
    }),

    strokeVTop: css({
        [media.desktop]: {
            '&::before': {
                ...commonV,
                height: `calc(50% + 0.25 * ${params.stroke.width})`,
                top: 0
            }
        }
    }),

    strokeVBottom: css({
        [media.desktop]: {
            '&::before': {
                ...commonV,
                height: `calc(50% - ${params.stroke.width})`,
                top: `calc(50% + 0.9 * ${params.stroke.width})`
            }
        }
    }),

    reverse: css({
        [media.mobile]: {
            flexDirection: 'row-reverse'
        }
    }),

    empty: css({
        width: '50%',

        [media.mobile]: {
            display: 'none'
        }
    })
}

const arrowsStyles: Record<Media, Record<Direction, SerializedStyles>> = {
    desktop: {
        up: css({
            ...arrowDesktopCommon(),
            top: '1.5%'
        }),
        down: css({
            ...arrowDesktopCommon(),
            bottom: '1.5%'
        })
    },
    mobile: {
        up: css({
            ...arrowMobileCommon(),
            top: '1%'
        }),
        down: css({
            ...arrowMobileCommon(),
            bottom: '1%'
        })
    }
}

function arrowDesktopCommon(): ObjectInterpolation<undefined> {
    return {
        ...arrowCommon(),
        [media.mobile]: {
            display: 'none'
        }
    }
}

function arrowMobileCommon(): ObjectInterpolation<undefined> {
    return {
        ...arrowCommon(),
        [media.desktop]: {
            display: 'none'
        }
    }
}

function arrowCommon(): ObjectInterpolation<undefined> {
    return {
        cursor: 'pointer',
        position: 'absolute',
        color: params.stroke.color,
        display: 'block',
        height: '2em',
        textShadow: '0 0 8px black',
        transition: 'transform 0.2s',

        '&:hover': {
            transform: 'scale(1.1)'
        },

        '& svg': {
            height: '100%',
            filter: 'drop-shadow(0 0 8px black)'
        }
    }
}
