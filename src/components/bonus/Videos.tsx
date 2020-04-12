/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FunctionComponent, useContext } from 'react'

import { TargetBlank } from '../TargetBlank'
import AppContext from '../../contexts/AppContext'
import { fontFamily } from '../../utils/css/fonts'
import params from '../../utils/css/params'

type Id = string
type Title = string
export type Video = [Id, Title]

interface Props {
  videos: Video[]
}

const styles = getStyles()

export const Videos: FunctionComponent<Props> = ({ videos }) => {
  const transl = useContext(AppContext).translation
  return (
    <div css={styles.container}>
      <h2 css={styles.title}>{transl.bonus.videos}</h2>
      <div css={styles.videos}>
        {videos.map(([id, title], i) => {
          // const embed = `https://www.youtube.com/embed/${id}`
          // const img = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
          const img = `https://i.ytimg.com/vi/${id}/hq720.jpg`
          return (
            <TargetBlank key={i} href={`https://youtu.be/${id}`} css={styles.video}>
              <span css={styles.thumbnail}>
                <img src={img} />
              </span>
              <div css={styles.videoTitle}>
                <span>{title}</span>
              </div>
            </TargetBlank>
          )
        })}
      </div>
    </div>
  )
}

function getStyles() {
  return {
    container: css({
      width: '100%',
      padding: '2em 0',
      fontFamily: fontFamily.baloopaaji2,
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
      letterSpacing: 0
    })
  }
}
