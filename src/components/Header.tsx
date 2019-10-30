/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FunctionComponent, useContext } from 'react'

import fireGif from '../../img/fire.gif'

import TranslationContext, {
    Language,
    languages
} from '../contexts/TranslationContext'
import { fontFamily } from '../utils/css/fonts'
import Link from './Link'

interface Props {
    currentLang: Language
    setLanguage: (lang: Language) => void
}

const Header: FunctionComponent<Props> = ({ currentLang, setLanguage }) => {
    const transl = useContext(TranslationContext)

    const changeLanguage = (lang: Language) => () => setLanguage(lang)

    return (
        <div id='title' css={styles.title}>
            <div css={styles.yarr}>{transl.preTitle}</div>
            <div css={styles.big}>
                <img css={styles.fireFirst} src={fireGif} />
                <Link to='/' css={styles.home}>
                    J<span>ean</span> P<span>lank</span>
                </Link>
                <img css={styles.fireSecond} src={fireGif} />
            </div>
            <div css={[styles.yarr, styles.langBtns]}>
                {languages.map(lang => (
                    <button
                        key={lang}
                        onClick={changeLanguage(lang)}
                        css={styles.langBtn}
                        className={lang === currentLang ? 'current' : undefined}
                    >
                        {lang}
                    </button>
                ))}
            </div>
        </div>
    )
}
export default Header

const styles = {
    title: css({
        position: 'absolute',
        top: 0,
        width: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        color: '#f1e6b7',
        textShadow: '0 0 3px black',
        padding: '0.33em 0.67em',
        flexWrap: 'wrap'
    }),

    yarr: css({
        flexGrow: 1,
        flexBasis: 0,
        fontFamily: fontFamily.yarr,
        fontWeight: 'normal',
        letterSpacing: '0.208vw'
    }),

    big: css({
        display: 'flex',
        fontSize: '2.1em',
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
    }),

    langBtn: css({
        padding: '0.33em 0.33em 0',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        color: 'inherit',
        background: 'none',
        border: 'none',
        cursor: 'pointer',

        '&:not(.current)': {
            color: '#666666',

            '&:hover': {
                color: '#aaaaaa'
            }
        }
    })
}
