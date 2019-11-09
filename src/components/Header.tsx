/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FunctionComponent, useContext } from 'react'

import fireGif from '../../img/fire.gif'

import AppContext from '../contexts/AppContext'
import HistoryContext from '../contexts/HistoryContext'
import { Language } from '../contexts/translation'
import { routes } from '../Router'
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
    const path = useContext(HistoryContext).location.pathname

    return (
        <div css={styles.container}>
            <div css={styles.nav}>
                <Link to={routes.home} css={styles.title}>
                    <div css={[styles.yarr, styles.trueStory]}>
                        {transl.preTitle}
                    </div>
                    <div
                        css={styles.link}
                        className={routes.home === path ? 'current' : undefined}
                    >
                        J<span>ean</span> P<span>lank</span>
                    </div>
                </Link>
                <HeaderLink path={path} to={routes.bonus}>
                    {transl.bonus}
                </HeaderLink>
                <HeaderLink path={path} to={routes.contact}>
                    {transl.contact}
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

const HeaderLink: FunctionComponent<{ path: string; to: string }> = ({
    path,
    to,
    children
}) => (
    <Link
        to={to}
        css={styles.link}
        className={to === path ? 'current' : undefined}
    >
        {children}
    </Link>
)

const sizes = {
    fireHeight: 1, // em
    fireTop: -0.1, // em
    firePadding: 0.33 // em
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
        // paddingBottom: '0.1em',
        fontSize: '1.1em',
        paddingRight: `${2 * sizes.firePadding + 0.539 * sizes.fireHeight}em`,
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
            width: `${0.539 * sizes.fireHeight}em`,
            marginRight: `${sizes.firePadding}em`,
            transition: 'opacity 0.5s',
            opacity: 0
        },

        '&.current::before': {
            opacity: 1
            // content: `''`,
            // width: 'calc(100% - 2em)',
            // position: 'absolute',
            // left: '1.33em',
            // bottom: '-0.05em',
            // borderBottom: `3px solid ${params.title.linkSepColor}`
            // // backgroundSize: '1px 1em',
            // // boxShadow: `inset 0 -0.175em ${params.title.linkSepColor}, inset 0 -0.2em black`
        }
    }),

    langsMenu: css({
        display: 'flex',
        justifyContent: 'flex-end'
    })
}
