/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core'
import { createRef, FunctionComponent, useEffect, useState } from 'react'

import { Language, languages } from '../contexts/translation'
import params from '../utils/css/params'

interface Props {
    currentLang: Language
    setLanguage: (lang: Language) => void
    styles?: SerializedStyles
}

const LangsMenu: FunctionComponent<Props> = ({
    currentLang,
    setLanguage,
    styles: overroadStyles
}) => {
    const [isOpen, setIsOpen] = useState(false)
    const menuRef = createRef<HTMLDivElement>()

    const closeLangs = (e: MouseEvent) => {
        if (
            menuRef.current === null ||
            !menuRef.current.contains(e.target as Node | null)
        ) {
            setIsOpen(false)
        }
    }

    useEffect(() => {
        document.body.addEventListener('click', closeLangs)
        return () => document.body.removeEventListener('click', closeLangs)
    }, [closeLangs])

    const toggleMenu = () => setIsOpen(!isOpen)

    const changeLanguage = (lang: Language) => () => {
        setLanguage(lang)
        setIsOpen(false)
    }

    return (
        <div ref={menuRef} css={[styles.container, overroadStyles]}>
            <button
                onClick={toggleMenu}
                css={styles.langBtn}
                className={'current'}
            >
                {currentLang}
            </button>
            {isOpen ? (
                <div css={styles.dropDown}>
                    {languages.map(lang => (
                        <button
                            key={lang}
                            onClick={changeLanguage(lang)}
                            css={[styles.langBtn, styles.langBtnMenu]}
                            className={
                                lang === currentLang ? 'current' : undefined
                            }
                        >
                            {lang}
                        </button>
                    ))}
                </div>
            ) : null}
        </div>
    )
}
export default LangsMenu

const styles = {
    container: css({
        position: 'relative',
        alignSelf: 'stretch',
        display: 'flex',
        alignItems: 'flex-end'
    }),

    dropDown: css({
        position: 'absolute',
        top: 'calc(100% + 0.2em)',
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        background: params.title.bg
    }),

    langBtn: css({
        padding: '0.33em 0.33em 0 0.33em',
        fontFamily: 'inherit',
        fontSize: 'inherit',
        lineHeight: 'inherit',
        color: 'inherit',
        background: 'none',
        border: 'none',
        cursor: 'pointer'
    }),

    langBtnMenu: css({
        '&:not(.current)': {
            color: params.title.notCurrentLang.color,

            '&:hover': {
                color: params.title.notCurrentLang.hoverColor
            }
        }
    })
}
