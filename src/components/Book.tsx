/** @jsx jsx */
import {
    css,
    InterpolationWithTheme,
    jsx,
    ObjectInterpolation
} from '@emotion/core'
import * as A from 'fp-ts/lib/Array'
import * as E from 'fp-ts/lib/Either'
import { pipe } from 'fp-ts/lib/pipeable'
import { Fragment, FunctionComponent, ReactNode, useState } from 'react'

import pngs from '../../img/*.png'

const PER_PAGE = 1

type Id = string
type Title = string
type Video = [Id, Title]
type Page = Video[]
type Sheet = E.Either<Page, Page>[]

const videos: Video[] = [
    ['aeWfN6CinGY', `When i'm TWI !`],
    ['psCSnnioq0M', `YOU WON'T BELIEVE WHAT THIS SCREAMING MAN CAN DO !!`],
    ['SSsXZEGOEFQ', `Jean Plank I : Naissance des Flammes de la Vengeance`],
    ['neqEc1DTN4k', `Jean Plank II : Les Flammes de la Vengeance`],
    ['0Z0vribHAGg', `TEASER JP2 VALHALLA OUAKBAR`]
]

const styles = getStyles()

const [head, tail] = A.splitAt(PER_PAGE)(videos)
const sheets: Sheet[] = [
    [E.left(head)],
    ...pipe(
        tail,
        A.chunksOf(2 * PER_PAGE),
        A.map(_ => {
            const [left, right] = A.splitAt(PER_PAGE)(_)
            return [E.left(left), E.right(right)]
        })
    )
]

const Book: FunctionComponent = () => {
    const [turned, setTurned] = useState(0)
    const canDecr = turned > 0
    const canIncr = turned < sheets.length - 1

    return (
        <div css={styles.container}>
            <button onClick={decr} disabled={!canDecr}>
                -
            </button>
            <div css={styles.book}>
                {pipe(
                    sheets,
                    A.mapWithIndex((i, sheet) => (
                        <div
                            key={i}
                            css={styles.sheet}
                            className={i <= turned ? 'turned' : undefined}
                        >
                            {sheet.map(_ =>
                                pipe(
                                    _,
                                    E.fold(
                                        getPage(styles.leftPage),
                                        getPage(styles.rightPage)
                                    )
                                )
                            )}
                        </div>
                    ))
                )}
            </div>
            <button onClick={incr} disabled={!canIncr}>
                +
            </button>
        </div>
    )

    function decr() {
        if (canDecr) setTurned(turned - 1)
    }

    function incr() {
        if (canIncr) setTurned(turned + 1)
    }
}
export default Book

function getPage(
    style: InterpolationWithTheme<any>
): (videos: Video[]) => ReactNode {
    return _ => (
        <div css={style}>
            {_.reduce<ReactNode>((acc, [id, title]) => {
                // const embed = `https://www.youtube.com/embed/${id}`
                const img = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
                return (
                    <Fragment>
                        {acc}
                        <a
                            href={`https://www.youtube.com/watch?v=${id}`}
                            target='_blank'
                            css={styles.video}
                        >
                            <span css={styles.thumbnail}>
                                <img src={img} />
                            </span>
                            <div css={styles.title}>{title}</div>
                        </a>
                    </Fragment>
                )
            }, null)}
        </div>
    )
}

function getStyles() {
    const padOut = '1.67em'
    const padIn = '1.67em'
    const padTop = '0.67em'
    const padBot = '1em'

    return {
        container: css({
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }),

        // 1140 x 853
        book: css({
            width: '60vw',
            maxWidth: `${1140 * 0.8}px`,
            height: '44.9vw',
            maxHeight: `${853 * 0.8}px`,
            display: 'flex',
            backgroundSize: '100% 100%',
            backgroundImage: `url('${pngs.book}')`,
            position: 'relative'
            // perspective: '2000px',
            // perspectiveOrigin: 'bottom center'
        }),

        sheet: css({
            position: 'absolute',
            right: 0,
            width: '50%',
            height: '100%',
            transformStyle: 'preserve-3d',
            transformOrigin: 'left',
            opacity: 0,
            transition: 'opacity 0.3s, transform 0.3s',

            '&.turned': {
                opacity: 1,
                // zIndex: 5,
                transform: 'rotateY(-180deg)'
            },

            '&.turned + &': {
                opacity: 1
                // zIndex: 5
            }
        }),

        leftPage: css({
            ...page(),
            transform: 'rotateY(180deg)',
            zIndex: 10,
            padding: `${padTop} ${padIn} ${padBot} ${padOut}`,
            backgroundImage: `url('${pngs.page_left}')`
        }),

        rightPage: css({
            ...page(),
            padding: `${padTop} ${padOut} ${padBot} ${padIn}`,
            backgroundImage: `url('${pngs.page_right}')`
        }),

        video: css({
            width: '100%',
            height: '100%',
            display: 'flex',
            color: 'inherit',
            textDecoration: 'none',
            flexDirection: 'column',
            textAlign: 'center',
            fontSize: '0.8em',
            filter: 'sepia(50%)',

            '&:hover': {
                textDecoration: 'underline'
            }
        }),

        thumbnail: css({
            flexGrow: 2,
            flexBasis: 0,
            display: 'flex',
            alignItems: 'flex-end',

            '& img': {
                width: '100%'
            }
        }),

        title: css({
            paddingTop: '0.67em',
            flexGrow: 1,
            flexBasis: 0
        })
    }
}

function page(): ObjectInterpolation<undefined> {
    return {
        position: 'absolute',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundSize: '100% 100%',
        backfaceVisibility: 'hidden'
    }
}
