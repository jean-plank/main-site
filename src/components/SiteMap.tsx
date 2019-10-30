/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core'
import { randomInt } from 'fp-ts/lib/Random'
import { FunctionComponent, useMemo } from 'react'
import * as ReactDom from 'react-dom'

import pngs from '../../img/*.png'

interface Props {
    size: number
}

const SiteMap: FunctionComponent<Props> = ({ size }) => {
    const range = useMemo(
        () => Array.from({ length: size }).map(_ => randomInt(0, 359)()),
        [size]
    )
    const domElt = document.getElementById('sitemap')
    if (domElt === null) {
        console.error('missing mount point for sitemap')
        return null
    }
    return ReactDom.createPortal(
        <div css={styles.sitemap}>
            {range.map((deg, i) => (
                <div key={i} css={styles.wildfire}>
                    <button css={styles.barrel}>
                        <img src={pngs.barrel} css={rotate(deg)} />
                    </button>
                </div>
            ))}
        </div>,
        domElt
    )
}
export default SiteMap

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
