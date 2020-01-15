/** @jsx jsx */
import { css, jsx, ObjectInterpolation, SerializedStyles } from '@emotion/core'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import {
    ChangeEvent,
    Fragment,
    FunctionComponent,
    ReactNode,
    useState
} from 'react'

import pngs from '../../img/*.png'
import { AngleLeft, AngleRight } from '../utils/svg'

type Id = string
type Title = string
type Video = [Id, Title]

const videos: Video[] = [
    ['aeWfN6CinGY', `When i'm TWI !`],
    ['psCSnnioq0M', `YOU WON'T BELIEVE WHAT THIS SCREAMING MAN CAN DO !!`],
    ['SSsXZEGOEFQ', `Jean Plank I : Naissance des Flammes de la Vengeance`],
    ['neqEc1DTN4k', `Jean Plank II : Les Flammes de la Vengeance`],
    ['0Z0vribHAGg', `TEASER JP2 VALHALLA OUAKBAR`]
]

const styles = getStyles()

const [firstVid, sheet, lastVid] = getSheet(videos)

function getSheet(
    videos: Video[]
): [O.Option<Video>, [Video, Video][], O.Option<Video>] {
    const [head, ...tail] = videos
    const [sheet, lastVid] = getSheetRec(tail)
    return [O.fromNullable(head), sheet, lastVid]
}

function getSheetRec(
    videos: Video[],
    acc: [Video, Video][] = []
): [[Video, Video][], O.Option<Video>] {
    const [v1, v2, ...tail] = videos
    /* tslint:disable:strict-type-predicates */
    if (v1 === undefined) return [acc, O.none]
    if (v2 === undefined) return [acc, O.some(v1)]
    /* tslint:enable:strict-type-predicates */
    return getSheetRec(tail, [...acc, [v1, v2]])
}

const Book: FunctionComponent = () => {
    const [turned, setTurned] = useState(0)
    const canDecr = turned > 0
    const canIncr = turned < sheet.length

    const starta = 28 // deg
    const a = starta / (sheet.length + 1) // deg

    function transform(i: number) {
        const diff = i - turned
        return css({
            transform:
                i <= turned
                    ? `rotateY(${-180 + starta + diff * a}deg)`
                    : `rotateY(${diff * a - starta}deg)`
        })
    }

    return (
        <div css={styles.container}>
            <div css={styles.book}>
                <div css={[styles.doublePage, transform(0)]}>
                    <div css={styles.rightBook}>
                        {pipe(firstVid, O.map(video), O.toNullable)}
                    </div>
                </div>
                {sheet.map(([v1, v2], i) => (
                    <div key={i} css={[styles.doublePage, transform(i + 1)]}>
                        <div css={styles.leftPage}>{video(v1)}</div>
                        <div css={styles.rightPage}>{video(v2)}</div>
                    </div>
                ))}
                <div css={[styles.doublePage, transform(sheet.length + 1)]}>
                    <div css={styles.leftBook}>
                        {pipe(lastVid, O.map(video), O.toNullable)}
                    </div>
                </div>
                <nav css={styles.pageNumber}>
                    <button
                        onClick={decr}
                        disabled={!canDecr}
                        css={styles.button}
                    >
                        <AngleLeft />
                    </button>
                    <input
                        type='range'
                        min={0}
                        max={sheet.length}
                        value={turned}
                        onChange={onPageChange}
                    />
                    <button
                        onClick={incr}
                        disabled={!canIncr}
                        css={styles.button}
                    >
                        <AngleRight />
                    </button>
                </nav>
            </div>
        </div>
    )

    function onPageChange(e: ChangeEvent<HTMLInputElement>) {
        const n = Number(e.target.value)
        if (!isNaN(n)) setTurned(n)
    }

    function decr() {
        if (canDecr) setTurned(turned - 1)
    }

    function incr() {
        if (canIncr) setTurned(turned + 1)
    }
}
export default Book

function video([id, title]: Video): ReactNode {
    // const embed = `https://www.youtube.com/embed/${id}`
    // const img = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
    const img = `https://i.ytimg.com/vi/${id}/hq720.jpg`
    return (
        <Fragment>
            <a
                href={`https://youtu.be/${id}`}
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
}

function getStyles() {
    const padOut = '1.67em'
    const padIn = '1.67em'
    const padTop = '0.67em'
    const padBot = '3.5em'

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
            perspective: '40em',
            position: 'absolute',

            '&, & *, & ::before, & ::after': {
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden'
            }
        }),

        doublePage: css({
            position: 'absolute',
            left: '50%',
            width: '70.6%',
            height: '100%',
            transformOrigin: '0 50%',
            transition: '.5s'
        }),

        leftBook: left(pngs.book_right),
        rightBook: right(pngs.book_left),
        leftPage: left(pngs.page_right),
        rightPage: right(pngs.page_left),

        video: css({
            width: '100%',
            height: '100%',
            display: 'flex',
            color: 'inherit',
            textDecoration: 'none',
            flexDirection: 'column',
            textAlign: 'center',
            fontSize: '0.7em',
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
                width: '100%',
                border: '1px solid black'
            }
        }),

        title: css({
            paddingTop: '0.67em',
            flexGrow: 1,
            flexBasis: 0
        }),

        pageNumber: css({
            position: 'absolute',
            top: '105%',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-around'
        }),

        button: css({
            background: 'none',
            border: 'none',
            height: '5em',
            color: '#c60707',
            display: 'flex',
            transition: 'transform 0.2s',
            padding: 0,

            '&:disabled': {
                opacity: 0.7
            },

            '&:hover:not(:disabled)': {
                cursor: 'pointer',
                transform: 'scale(1.1)'
            },

            '& svg': {
                height: '100%',
                filter: 'drop-shadow(3px 0px 0 #f7e3a2)',
                transformStyle: 'unset'
            }
        })
    }

    function left(bg: any): SerializedStyles {
        return css({
            ...page(bg),
            padding: `${padTop} ${padIn} ${padBot} ${padOut}`
        })
    }

    function right(bg: any): SerializedStyles {
        return css({
            ...page(bg),
            transform: 'rotateY(180deg)',
            padding: `${padTop} ${padOut} ${padBot} ${padIn}`
        })
    }
}

function page(bg: any): ObjectInterpolation<undefined> {
    return {
        position: 'absolute',
        top: 0,
        width: 'inherit',
        height: 'inherit',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundSize: '100% 100%',
        backgroundImage: `url(${bg})`
    }
}
