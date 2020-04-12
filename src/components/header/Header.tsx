/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FunctionComponent, useContext } from 'react'

import fireGif from '../../../img/fire.gif'

import AppContext from '../../contexts/AppContext'
import HistoryContext from '../../contexts/HistoryContext'
import { Language } from '../../contexts/translation'
import { routes } from '../../Router'
import { fontFamily } from '../../utils/css/fonts'
import params from '../../utils/css/params'
import LangPicker from './LangPicker'
import Link from './Link'

interface Props {
  currentLang: Language
  setLanguage: (lang: Language) => void
}

const Header: FunctionComponent<Props> = ({ currentLang, setLanguage }) => {
  const transl = useContext(AppContext).translation
  const path = useContext(HistoryContext).location.pathname

  return (
    <div css={styles.container}>
      <div css={styles.nav}>
        <Link to={routes.home} css={styles.title}>
          <div css={[styles.yarr, styles.trueStory]}>{transl.header.preTitle}</div>
          <div css={styles.link} className={routes.home === path ? 'current' : undefined}>
            J<span>ean</span> P<span>lank</span>
          </div>
        </Link>
        <HeaderLink path={path} to={routes.bonus}>
          {transl.header.bonus}
        </HeaderLink>
        <HeaderLink path={path} to={routes.contact}>
          {transl.header.contact}
        </HeaderLink>
      </div>
      <LangPicker
        currentLang={currentLang}
        setLanguage={setLanguage}
        styles={css(styles.yarr, styles.langsMenu)}
      />
    </div>
  )
}
export default Header

const HeaderLink: FunctionComponent<{ path: string; to: string }> = ({ path, to, children }) => (
  <Link to={to} css={styles.link} className={to === path ? 'current' : undefined}>
    {children}
  </Link>
)

const sizes = {
  fireHeight: 1, // em
  fireTop: -0.1, // em
  firePadding: 0.33, // em
  underlinePadding: 0.5, // em

  get fireWidth(): number {
    return 0.539 * this.fireHeight
  },
  get linkPaddingRight(): number {
    return 2 * this.firePadding
  },
  get linkTextWidth(): number {
    return this.firePadding + this.fireWidth + this.linkPaddingRight + 2 * sizes.underlinePadding
  },
  get linkTextWidthA(): number {
    return this.linkTextWidth + this.firePadding
  }
}

const styles = {
  container: css({
    position: 'absolute',
    top: 0,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: params.title.bg,
    color: params.title.color,
    textShadow: '0 0 3px black',
    padding: '0.2em 0.33em 0.2em 0.33em',
    flexWrap: 'wrap'
  }),

  nav: css({
    display: 'flex',
    alignSelf: 'stretch',
    alignItems: 'flex-end'
  }),

  title: css({
    display: 'flex',
    flexDirection: 'column',
    fontWeight: 'bold',
    letterSpacing: '-0.052vw',
    color: 'inherit',
    textDecoration: 'none'
  }),

  yarr: css({
    fontFamily: fontFamily.yarr,
    fontWeight: 'normal',
    letterSpacing: '0.03em'
  }),

  trueStory: css({
    fontSize: '0.5em',
    marginTop: '0.2em'
  }),

  link: css({
    color: 'inherit',
    textDecoration: 'none',
    fontSize: '1.1em',
    paddingRight: `${sizes.linkPaddingRight}em`,
    position: 'relative',
    display: 'flex',

    'a&': {
      paddingLeft: `${sizes.firePadding}em`,
      borderLeft: `3px solid ${params.title.linkSepColor}`
    },

    '&::before': {
      content: `''`,
      background: `url('${fireGif}')`,
      backgroundSize: '100% 100%',
      display: 'block',
      position: 'relative',
      top: `${sizes.fireTop}em`,
      height: `${sizes.fireHeight}em`,
      width: `${sizes.fireWidth}em`,
      marginRight: `${sizes.firePadding}em`,
      transition: 'opacity 0.5s',
      opacity: 0
    },

    '&.current::before': {
      opacity: 1
    },

    '&::after': {
      content: `''`,
      position: 'absolute',
      width: `calc(100% - ${sizes.linkTextWidth}em)`,
      right: `${sizes.linkPaddingRight + sizes.underlinePadding}em`,
      bottom: '-0.05em',
      border: `1px solid ${params.title.linkSepColor}`,
      borderWidth: '1px 0',
      borderRadius: '50%',
      transition: 'opacity 0.3s',
      opacity: 0
    },

    '&:hover::after': {
      opacity: 1
    },

    'a&::after': {
      width: `calc(100% - ${sizes.linkTextWidthA}em)`
    }
  }),

  langsMenu: css({
    display: 'flex',
    justifyContent: 'flex-end'
  })
}
