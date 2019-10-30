/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core'
import * as A from 'fp-ts/lib/Array'
import * as NA from 'fp-ts/lib/NonEmptyArray'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { randomInt } from 'fp-ts/lib/Random'
import {
    Dispatch,
    FunctionComponent,
    MouseEventHandler,
    SetStateAction,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react'
import * as ReactDom from 'react-dom'

import pngs from '../../img/*.png'

import ParallaxEltContext from '../contexts/ParallaxEltContext'

interface Props {
    sections: O.Option<HTMLElement>[]
}

const SiteMap: FunctionComponent<Props> = ({ sections }) => {
    const [current, setCurrent] = useState(-1)

    const parallaxElt = useContext(ParallaxEltContext)
    useEffect(() => {
        pipe(
            parallaxElt,
            O.map(elt => {
                pipe(
                    findCurrent(elt.scrollTop, sections),
                    O.map(setCurrent)
                )
                elt.addEventListener(
                    'scroll',
                    onScroll(elt, sections, setCurrent)
                )
            })
        )
    }, [parallaxElt, sections])

    const rotations = useMemo(
        () =>
            Array.from({ length: sections.length }).map(_ =>
                randomInt(0, 359)()
            ),
        [sections.length]
    )

    return pipe(
        O.fromNullable(document.getElementById('sitemap')),
        O.map(elt =>
            ReactDom.createPortal(
                <div css={styles.sitemap}>
                    {rotations.map((deg, i) => (
                        <div
                            key={i}
                            css={styles.wildfire}
                            className={i === current ? 'current' : undefined}
                        >
                            <button
                                onClick={scrollIntoView(i, sections)}
                                css={styles.barrel}
                            >
                                <img src={pngs.barrel} css={rotate(deg)} />
                            </button>
                        </div>
                    ))}
                </div>,
                elt
            )
        ),
        O.toNullable
    )
}
export default SiteMap

function onScroll(
    elt: HTMLElement,
    sections: O.Option<HTMLElement>[],
    setCurrent: Dispatch<SetStateAction<number>>
): () => void {
    return () =>
        pipe(
            findCurrent(elt.scrollTop, sections),
            O.map(setCurrent)
        )
}

function findCurrent(
    scrollTop: number,
    sections: O.Option<HTMLElement>[]
): O.Option<number> {
    const findCurrentRec = (
        sections: HTMLElement[],
        i: number,
        previousTop: number,
        acc: number
    ): number => {
        if (sections === []) return acc

        const [elt, ...tail] = sections
        const top = elt.offsetTop - scrollTop
        if (top >= 0) return top < -previousTop ? i : acc

        return findCurrentRec(tail, i + 1, top, i)
    }

    if (A.isNonEmpty(sections) && sections.every(O.isSome)) {
        const i = pipe(
            sections as NA.NonEmptyArray<O.Some<HTMLElement>>,
            A.map(_ => _.value),
            _ => findCurrentRec(_, 0, 0, 0)
        )
        return O.some(i)
    }
    return O.none
}

function scrollIntoView(
    i: number,
    sections: O.Option<HTMLElement>[]
): MouseEventHandler {
    return () => {
        pipe(
            A.lookup(i, sections),
            O.map(_ =>
                pipe(
                    _,
                    O.map(_ => _.scrollIntoView({ behavior: 'smooth' }))
                )
            )
        )
    }
}

function rotate(deg: number): SerializedStyles {
    return css({ transform: `rotate(${deg}deg)` })
}

const styles = {
    sitemap: css({
        position: 'fixed',
        top: 0,
        left: '0.4vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    }),
    wildfire: css({
        width: '4vw',
        height: '4vw',
        position: 'relative',

        '& + &': {
            marginTop: '12vh',

            '&::before': {
                height: 'calc(1vw + 12vh)',
                width: '60%',
                content: `''`,
                position: 'absolute',
                bottom: '3.5vw',
                left: '20%',
                backgroundImage: `url('${pngs.gunpowder}')`,
                backgroundSize: '100% 100%',
                zIndex: -1
            }
        }
    }),
    barrel: css({
        border: 'none',
        padding: 0,
        background: 'none',
        height: '100%',
        width: '100%',
        cursor: 'pointer',

        '& img': {
            height: '100%',
            width: '100%'
        },

        '&::after': {
            content: `''`,
            position: 'absolute',
            left: '4%',
            top: '17%',
            backgroundImage: `url('${pngs.sparkle}')`,
            backgroundSize: '100% 100%',
            height: '66%',
            width: '66%',
            opacity: 0,
            transition: 'opacity 0.4s',

            '.current &': {
                opacity: 1
            }
        }
    })
}
