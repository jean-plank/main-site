/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FunctionComponent, useContext } from 'react'

import fireGif from '../../img/fire.gif'

import AppContext from '../contexts/AppContext'
import { Language } from '../contexts/translation'
import { fontFamily } from '../utils/css/fonts'
import params from '../utils/css/params'
import LangPicker from './LangPicker'
import Link from './Link'

interface Props {
    currentLang: Language
    setLanguage: (lang: Language) => void
}

const Header: FunctionComponent<Props> = ({ currentLang, setLanguage }) => {
    const transl = useContext(AppContext).translation

    return (
        <div css={styles.container}>
            <Link to='/' css={styles.title}>
                <div css={[styles.yarr, styles.trueStory]}>
                    {transl.preTitle}
                </div>
                <div css={styles.fireJpFire}>
                    <img css={styles.fireFirst} src={fireGif} />
                    <span css={styles.jp}>
                        J<span>ean</span> P<span>lank</span>
                    </span>
                    <img css={styles.fireSecond} src={fireGif} />
                </div>
            </Link>
            <div css={styles.nav}>
                <LangPicker
                    currentLang={currentLang}
                    setLanguage={setLanguage}
                    styles={css(styles.yarr, styles.langsMenu)}
                />
            </div>
        </div>
    )
}
export default Header

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

    fireJpFire: css({
        marginLeft: '1em'
    }),

    jp: css({
        fontSize: '1.4em'
    }),

    fireFirst: css({
        height: '1em',
        marginRight: '0.1em'
    }),

    fireSecond: css({
        height: '1em',
        marginLeft: '0.3em'
    }),

    nav: css({
        display: 'flex',
        alignSelf: 'stretch'
    }),

    links: css({
        borderRight: `2px solid ${params.title.color}`
    }),

    langsMenu: css({
        display: 'flex',
        justifyContent: 'flex-end'
    })
}
