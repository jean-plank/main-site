/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { FunctionComponent, ReactNode, useContext } from 'react'

import ratioHolder from '../../img/ratio_holder.png'

import AppContext from '../contexts/AppContext'
import { GameId } from '../contexts/translation'
import { fontFamily } from '../utils/css/fonts'
import media from '../utils/css/media'
import params from '../utils/css/params'
import { Ban } from '../utils/svg'

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

const Game: FunctionComponent<Props> = ({ id, gameId, jpTitle, image, header, footer, style }) => {
  const transl = useContext(AppContext).translation
  const gameTransl = transl[gameId]

  return (
    <div id={id} css={[styles.container, style?.container]}>
      {header}
      <div css={[styles.game, style?.game]}>
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
          {noLinks() ? <div css={styles.notOutYet}>{transl.notOutYet}</div> : null}
        </div>
      </div>
      {footer}
    </div>
  )

  function noLinks(): boolean {
    return O.isNone(gameTransl.links.launch) && O.isNone(gameTransl.links.dl)
  }

  function launchDl(): ReactNode {
    const links = gameTransl.links
    if (noLinks()) {
      return <div css={styles.launchDl}>{under18(transl.advisoryAlready)}</div>
    }
    return (
      <div css={styles.launchDl}>
        {pipe(
          links.dl,
          O.map(dl => (
            // tslint:disable-next-line: jsx-key
            <a href={dl} download={true}>
              {transl.dl}
            </a>
          )),
          O.toNullable
        )}
        {pipe(
          links.launch,
          O.map(launch => (
            // tslint:disable-next-line: jsx-key
            <a href={launch} target='_blank' css={styles.launch}>
              {transl.launch}
            </a>
          )),
          O.toNullable
        )}
        {under18(transl.advisory)}
      </div>
    )
  }

  function under18(message: string): ReactNode {
    return (
      <div css={styles18.container}>
        <span css={styles18.sign}>
          <span css={styles18.eighteen}>-18</span>
          <Ban css={styles18.ban} />
        </span>
        <span css={styles18.message}>{message}</span>
      </div>
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
    minHeight: '100vh',

    [media.desktop]: {
      position: 'relative',
      padding: '0 1%',
      width: '50%'
    },

    [media.mobile]: {
      width: '100%',
      scrollSnapAlign: 'start',
      position: 'relative'
    }
  }),

  game: css({
    [media.desktop]: {
      position: 'relative',
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

  launch: css({
    '& i': {
      display: 'block',
      fontFamily: fontFamily.normal,
      fontSize: '0.5em',
      color: params.game.details.color,
      marginTop: '0.1em'
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

const styles18 = {
  container: css({
    fontFamily: fontFamily.normal,
    height: '1.7em',
    display: 'flex',
    alignItems: 'center'
  }),
  sign: css({
    position: 'relative',
    marginRight: '0.33em'
  }),
  eighteen: css({
    display: 'inline-block',
    padding: '0.35em 0.1em',
    fontSize: '0.9em',
    letterSpacing: '-3px',
    color: 'goldenrod'
  }),
  ban: css({
    position: 'absolute',
    left: 0,
    height: '1.6em',
    color: params.game.notOutYet.bg
  }),
  message: css({
    alignSelf: 'center',
    fontSize: '0.5em',
    padding: '0.33em 0'
  })
}
