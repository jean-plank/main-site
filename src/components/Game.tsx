/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { FunctionComponent, ReactNode, useContext } from 'react'

import ratioHolder from '../../img/ratio_holder.png'

import AppContext from '../contexts/AppContext'
import { GameId } from '../contexts/translation'
import media from '../utils/css/media'
import params from '../utils/css/params'

interface Props {
    id?: string
    gameId: GameId
    jpTitle: string
    image: string
    header?: ReactNode
    footer?: ReactNode
    style?: {
        container?: SerializedStyles
        game?: SerializedStyles
    }
}

const Game: FunctionComponent<Props> = ({
    id,
    gameId,
    jpTitle,
    image,
    header,
    footer,
    style
}) => {
    const transl = useContext(AppContext).translation
    const gameTransl = transl[gameId]

    const container = style === undefined ? null : style.container
    const game = style === undefined ? null : style.game

    return (
        <div id={id} css={[styles.container, container]}>
            {header}
            <div css={[styles.game, game]}>
                <img css={styles.ratioHolder} src={ratioHolder} />
                <div css={[styles.gameDiv, styles.details]}>
                    <div css={styles.description}>{gameTransl.summary}</div>
                    {launchDl()}
                </div>
                <div css={[styles.gameDiv, styles.cover]}>
                    <img css={styles.coverImg} src={image} />
                    <div css={styles.title}>
                        <div css={styles.titleBis}>
                            <div>{jpTitle}</div>
                            <div>{gameTransl.title}</div>
                        </div>
                    </div>
                    {O.isNone(gameTransl.links) ? (
                        <div css={styles.notOutYet}>{transl.notOutYet}</div>
                    ) : null}
                </div>
            </div>
            {footer}
        </div>
    )

    function launchDl(): ReactNode {
        return pipe(
            gameTransl.links,
            O.map(links => (
                // tslint:disable-next-line: jsx-key
                <div css={styles.launchDl}>
                    <a href={links.launch} target='_blank'>
                        {transl.launch}
                    </a>
                    <a href={links.dl} download={true}>
                        {transl.dl}
                    </a>
                    <i>{transl.advisory}</i>
                </div>
            )),
            O.getOrElse(() => (
                <div css={styles.launchDl}>
                    <i>{transl.advisoryAlready}</i>
                </div>
            ))
        )
    }
}
export default Game

const styles = {
    container: css({
        margin: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

        [media.desktop]: {
            minHeight: '100vh',
            position: 'relative',
            padding: '0 1%',
            width: '50%'
        },

        [media.mobile]: {
            width: '100%',
            minHeight: '100vh',
            scrollSnapAlign: 'start',
            position: 'relative'
        }
    }),

    game: css({
        [media.desktop]: {
            position: 'relative',
            cursor: 'pointer',
            margin: 'auto 5%',
            width: '50%',
            maxWidth: '384px'
        },

        [media.mobile]: {
            width: '100%',
            display: 'flex',
            alignItems: 'stretch',
            background: params.game.bg,
            padding: '1vw'
        }
    }),

    ratioHolder: css({
        border: `${params.game.border.width} solid transparent`,
        display: 'block',
        width: '100%',

        [media.mobile]: {
            display: 'none'
        }
    }),

    gameDiv: css({
        border: `${params.game.border.width} solid transparent`,

        [media.desktop]: {
            position: 'absolute',
            top: 0,
            width: '100%',
            height: '100%',
            left: 0,
            transition: 'left 0.4s'
        },

        [media.mobile]: {
            flexBasis: 0
        }
    }),

    details: css({
        display: 'flex',
        flexDirection: 'column',
        color: params.game.details.color,

        [media.desktop]: {
            background: params.game.bg,
            fontSize: '0.8em',

            '*:hover > &': {
                left: '50%'
            }
        },

        [media.mobile]: {
            flexGrow: 6,
            borderWidth: 0,
            fontSize: '1.2em'
        }
    }),

    description: css({
        flexGrow: 1,
        overflow: 'hidden',
        position: 'relative',
        padding: '0.2em',

        '& i': {
            fontSize: '0.8em'
        }
    }),

    launchDl: css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',

        '&::before': {
            content: `''`,
            width: '90%',
            borderTop: `1px solid ${params.game.launchDl.color}`
        },

        '& i': {
            alignSelf: 'center',
            fontFamily: 'Verdana, Geneva, Tahoma, sans-serif',
            fontSize: '0.3em',
            padding: '0.33em 0'
        },

        '& a': {
            width: '100%',
            textAlign: 'center',
            textDecoration: 'none',
            color: params.game.launchDl.color,
            padding: '0.33em 0',
            transition: 'text-shadow 0.1s',

            '&:hover': {
                textShadow: `0 0 20px ${params.game.launchDl.hoverShadowColor}`
            }
        }
    }),

    cover: css({
        borderColor: params.game.border.color,
        boxShadow: '0 0 10px black',
        overflow: 'hidden',

        [media.desktop]: {
            '*:hover > &': {
                left: '-50%'
            }
        },

        [media.mobile]: {
            position: 'relative',
            flexGrow: 4,
            alignSelf: 'center',
            height: 'auto'
        }
    }),

    coverImg: css({
        width: '100%',

        [media.mobile]: {
            display: 'block'
        }
    }),

    title: css({
        position: 'absolute',
        color: params.game.title.color,
        textShadow: '0 0 3px black',
        width: '100%',
        height: '100%',
        top: 0,

        [media.mobile]: {
            fontSize: '1.7em'
        }
    }),

    titleBis: css({
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',

        '& div': {
            textAlign: 'center',
            padding: '0.2em',
            lineHeight: 0.9,
            background: params.game.title.bg
        }
    }),

    notOutYet: css({
        position: 'absolute',
        background: params.game.notOutYet.bg,
        color: params.game.notOutYet.color,
        width: '161.6%',
        textAlign: 'center',
        left: '-20%',
        bottom: '14.5%',
        opacity: 0.9,
        transform: 'translateY(-50%) rotate(-30deg)',
        transformOrigin: 'left center',
        padding: '0.1em 0',

        [media.mobile]: {
            fontSize: '1.7em'
        }
    })
}
