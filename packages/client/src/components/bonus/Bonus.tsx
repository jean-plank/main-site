/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Fragment, FunctionComponent, useContext } from 'react'

import bgNotFoundJpg from '../../../img/bg_not_found.jpg'
import jp1Jpg from '../../../img/jp1.jpg'

import { BonusBg } from './BonusBg'
import { Video, Videos } from './Videos'
import { Label } from '../Label'
import { Game } from '../game/Game'
import { AppContext } from '../../contexts/AppContext'
import { fadeIn } from '../../utils/css/fadeIn'
import { fontFamily } from '../../utils/css/fonts'
import { parallax } from '../../utils/css/parallax'
import { params } from '../../utils/css/params'

export const Bonus: FunctionComponent = () => {
  const transl = useContext(AppContext).translation
  return (
    <Fragment>
      <BonusBg />

      <div css={[parallax.group, styles.group]}>
        <div css={[parallax.layerBack, styles.thestoryContainer]}>
          <Game
            gameId={'thestory'}
            jpTitle={'Jean Plank'}
            image={jp1Jpg}
            style={{ container: styles.thestory }}
          />
          <Label css={styles.label}>{transl.bonus.thestoryLabel}</Label>
        </div>

        <div css={[parallax.layerBase, styles.tutorialContainer]}>
          <img src={transl.bonus.tutorialImg} css={styles.tutorial} />
        </div>

        <div css={[parallax.layerBack, styles.videosContainer]}>
          <Videos videos={videos} />
        </div>
      </div>
    </Fragment>
  )
}

const videos: Video[] = [
  ['aeWfN6CinGY', `When i'm TWI !`],
  ['psCSnnioq0M', `YOU WON'T BELIEVE WHAT THIS SCREAMING MAN CAN DO !!`],
  ['0AfNhK9aCjo', `My work here is done`],
  // ['SB4Qr06E9pk', `Cette vidéo peut causer des lésions au cerveau...`],
  ['0oYg2Skoky8', `Lucien Dead Metal - Le Siphon`],
  ['SSsXZEGOEFQ', `Jean Plank I : Naissance des Flammes de la Vengeance`],
  ['neqEc1DTN4k', `Jean Plank II : Les Flammes de la Vengeance`],
  ['0Z0vribHAGg', `TEASER JP2 VALHALLA OUAKBAR`],
  ['Wenq_ezDckc', `Genièvre épisode 1 : Le début`]
]

const styles = {
  group: css({
    height: '200vh'
  }),

  thestoryContainer: css({
    height: '100vh',
    width: '100vw',
    paddingTop: '2.1em',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    animation: fadeIn('1.5s'),
    position: 'relative'
  }),

  thestory: css({
    minHeight: 'auto',
    margin: 0
  }),

  label: css({
    '& h4': {
      fontFamily: fontFamily.yarr,
      fontSize: '1.1em',
      letterSpacing: '0.03em'
    }
  }),

  tutorialContainer: css({
    top: '100vh',
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: `url('${bgNotFoundJpg}')`,
    backgroundSize: 'cover',
    boxShadow: '0 0 10px black'
  }),

  tutorial: css({
    maxWidth: '1920px',
    maxHeight: '90%',
    border: `5px solid ${params.game.border.color}`
  }),

  videosContainer: css({
    top: '200vh',
    width: '100vw'
  })
}
