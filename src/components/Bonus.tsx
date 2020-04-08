/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { Fragment, FunctionComponent, useContext } from 'react'

import jpgs from '../../img/*.jpg'

import AppContext from '../contexts/AppContext'
import fadeIn from '../utils/css/fadeIn'
import { fontFamily } from '../utils/css/fonts'
import * as parallax from '../utils/css/parallax'
import params from '../utils/css/params'
import BonusBg from './BonusBg'
import Game from './Game'
import { Label } from './Label'
import { Video, Videos } from './Videos'

const Bonus: FunctionComponent = () => {
  const transl = useContext(AppContext).translation
  return (
    <Fragment>
      <BonusBg />

      <div css={[parallax.group, styles.group]}>
        <div css={[parallax.layerBack, styles.thestoryContainer]}>
          <Game
            gameId={'thestory'}
            jpTitle={'Jean Plank'}
            image={jpgs.jp1}
            style={{ container: styles.thestory }}
          />
          <Label>{transl.thestoryLabel}</Label>
        </div>

        <div css={[parallax.layerBase, styles.tutorialContainer]}>
          <img src={transl.tutorialImg} css={styles.tutorial} />
        </div>

        <div css={[parallax.layerBack, styles.videosContainer]}>
          <Videos videos={videos} />
        </div>
      </div>
    </Fragment>
  )
}
export default Bonus

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
    maxWidth: '1100px',
    margin: '0 1.67em',
    background: `url('${jpgs.label}')`,
    backgroundSize: 'cover',
    padding: '0.5em 1em 0.3em',
    border: '5px solid #8e6400',
    boxShadow: '0 0 10px black',
    fontSize: '0.9em',

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
    background: `url('${jpgs.bg_not_found}')`,
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
