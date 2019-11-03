/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FunctionComponent, useContext } from 'react'

import fireGif from '../../img/fire.gif'

import AppContext from '../contexts/AppContext'
import { Language } from '../contexts/translation'
import { fontFamily } from '../utils/css/fonts'
import params from '../utils/css/params'
import LangsMenu from './LangsMenu'
import Link from './Link'

interface Props {
    currentLang: Language
    setLanguage: (lang: Language) => void
}

const Header: FunctionComponent<Props> = ({ currentLang, setLanguage }) => {
    const transl = useContext(AppContext).translation

    return (
        <div css={styles.container}>
            <div css={[styles.yarr, styles.preTitle]}>{transl.preTitle}</div>
            <div css={styles.title}>
                <img css={styles.fireFirst} src={fireGif} />
                <Link to='/' css={styles.home}>
                    J<span>ean</span> P<span>lank</span>
                </Link>
                <img css={styles.fireSecond} src={fireGif} />
            </div>
            <LangsMenu
                currentLang={currentLang}
                setLanguage={setLanguage}
                styles={css(styles.yarr, styles.langBtns)}
            />
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
        alignItems: 'flex-end',
        background: params.title.bg,
        color: params.title.color,
        textShadow: '0 0 3px black',
        padding: '0.2em 0 0.2em 0.33em',
        flexWrap: 'wrap'
    }),

    yarr: css({
        flexGrow: 1,
        flexBasis: 0,
        fontFamily: fontFamily.yarr,
        fontWeight: 'normal',
        letterSpacing: '0.03em'
    }),

    preTitle: css({
        marginRight: '0.33em',
        fontSize: '0.9em'
    }),

    title: css({
        display: 'flex',
        fontSize: '1.6em',
        fontWeight: 'bold',
        letterSpacing: '-0.052vw'
    }),

    home: css({
        color: 'inherit',
        textDecoration: 'none'
    }),

    fireFirst: css({
        height: '0.9em',
        marginRight: '0.2em'
    }),

    fireSecond: css({
        height: '0.9em',
        marginLeft: '0.2em'
    }),

    langBtns: css({
        display: 'flex',
        justifyContent: 'flex-end'
    })
}
