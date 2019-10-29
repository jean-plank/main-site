/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { FunctionComponent, ReactNode, useContext } from 'react'

import ratioHolder from '../../img/ratio_holder.png'

import TranslationContext, { GameId } from '../contexts/TranslationContext'
import media from '../cssUtils/media'
import params from '../cssUtils/params'
import { commonV } from '../cssUtils/strokeBefore'

interface Props {
    gameId: GameId
    jpTitle: string
    image: string
    strokeVTop?: boolean
    strokeVBottom?: boolean
}

const Game: FunctionComponent<Props> = ({
    gameId,
    jpTitle,
    image,
    strokeVTop = false,
    strokeVBottom = false
}) => {
    const transl = useContext(TranslationContext)
    const gameTransl = transl[gameId]

    const container: SerializedStyles | null = (() => {
        if (strokeVTop && strokeVBottom) return styles.strokeV
        if (strokeVTop) return styles.strokeVTop
        if (strokeVBottom) return styles.strokeVBottom
        return null
    })()

    return (
        <div css={[styles.container, container]}>
            <div css={styles.game}>
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
        aligntItems: 'center',

        [media.desktop]: {
            minHeight: '100vh',
            position: 'relative',
            padding: '0 1%',
            width: '50%'
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

    game: css({
        [media.desktop]: {
            position: 'relative',
            cursor: 'pointer',
            margin: 'auto 5%',
            width: '50%',
            maxWidth: '384px'
        }
    }),

    ratioHolder: css({
        border: `${params.game.border.width} solid transparent`,
        display: 'block',
        width: '100%'
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
        }
    }),

    details: css({
        display: 'flex',
        flexDirection: 'column',
        color: params.game.details.color,

        [media.desktop]: {
            background: params.game.details.bg,
            fontSize: '0.8em',

            '*:hover > &': {
                left: '50%'
            }
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
            borderTop: `1px solid ${params.game.launchDlColor}`
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
            color: params.game.launchDlColor,
            padding: '0.33em 0',

            [media.desktop]: {
                transition: 'text-shadow 0.1s',

                '&:hover': {
                    textShadow: '0 0 20px wheat'
                }
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
        }
    }),

    coverImg: css({
        width: '100%'
    }),

    title: css({
        position: 'absolute',
        color: params.game.title.color,
        textShadow: '0 0 3px black',
        width: '100%',
        height: '100%',
        top: 0
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
        padding: '0.1em 0'
    })
}
