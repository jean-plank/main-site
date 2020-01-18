/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FunctionComponent, useContext } from 'react'

import AppContext from '../contexts/AppContext'
import { fontFamily } from '../utils/css/fonts'
import params from '../utils/css/params'

type Id = string
type Title = string
type Video = [Id, Title]

export const videos: Video[] = [
    ['aeWfN6CinGY', `When i'm TWI !`],
    ['psCSnnioq0M', `YOU WON'T BELIEVE WHAT THIS SCREAMING MAN CAN DO !!`],
    ['SSsXZEGOEFQ', `Jean Plank I : Naissance des Flammes de la Vengeance`],
    ['neqEc1DTN4k', `Jean Plank II : Les Flammes de la Vengeance`],
    ['0Z0vribHAGg', `TEASER JP2 VALHALLA OUAKBAR`]
]

interface Props {
    videos: Video[]
}

const styles = getStyles()

const Videos: FunctionComponent<Props> = ({ videos }) => {
    const transl = useContext(AppContext).translation
    return (
        <div css={styles.container}>
            <h2 css={styles.title}>{transl.videos}</h2>
            <div css={styles.videos}>
                {videos.map(([id, title], i) => {
                    // const embed = `https://www.youtube.com/embed/${id}`
                    // const img = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
                    const img = `https://i.ytimg.com/vi/${id}/hq720.jpg`
                    return (
                        <a
                            key={i}
                            href={`https://youtu.be/${id}`}
                            target="_blank"
                            css={styles.video}
                        >
                            <span css={styles.thumbnail}>
                                <img src={img} />
                            </span>
                            <div css={styles.videoTitle}>
                                <span>{title}</span>
                            </div>
                        </a>
                    )
                })}
            </div>
        </div>
    )
}
export default Videos

function getStyles() {
    return {
        container: css({
            width: '100%',
            padding: '2em 0',
            color: '#f1e6b7'
        }),

        title: css({
            textAlign: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            padding: '0.33em 0',
            marginBottom: '0.33em'
        }),

        videos: css({
            letterSpacing: 1,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center'
        }),

        video: css({
            border: `3px solid ${params.game.border.color}`,
            padding: '0.67em',
            margin: '0.67em 1.33em',
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
            display: 'flex',
            color: '#d5cebe',
            textDecoration: 'none',
            flexDirection: 'column',
            textAlign: 'center',
            fontSize: '0.7em',
            filter: 'sepia(50%)',
            flexShrink: 0,
            transition: 'transform 0.3s',
            boxShadow: '0 0 10px black',

            '&:hover': {
                transform: 'scale(1.04)'
            }
        }),

        thumbnail: css({
            '& img': {
                border: '1px solid black',
                width: '300px'
            }
        }),

        videoTitle: css({
            width: '350px',
            paddingTop: '0.67em',
            fontSize: '0.8em',
            flexGrow: 1,
            flexBasis: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: fontFamily.normal,
            letterSpacing: '-1px'
        })
    }
}
