/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core'
import { FunctionComponent, useState, MouseEventHandler } from 'react'

import { Language, languages } from '../../contexts/translation'
import { useClickOutside } from '../../hooks/useClickOutside'
import params from '../../utils/css/params'

interface Props {
  currentLang: Language
  setLanguage: (lang: Language) => void
  styles?: SerializedStyles
}

const LangPicker: FunctionComponent<Props> = ({
  currentLang,
  setLanguage,
  styles: overroadStyles
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const clickOutsideRef = useClickOutside<HTMLDivElement>(close)

  return (
    <div ref={clickOutsideRef} css={[styles.container, overroadStyles]}>
      <button onClick={toggleMenu} css={styles.langBtn} className={'current'}>
        {currentLang}
      </button>
      {isOpen ? (
        <div css={styles.dropDown}>
          {languages.map(lang => (
            <button
              key={lang}
              onClick={changeLanguage(lang)}
              css={[styles.langBtn, styles.langBtnMenu]}
              className={lang === currentLang ? 'current' : undefined}
            >
              {lang}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )

  function close(): void {
    setIsOpen(false)
  }

  function toggleMenu(): void {
    setIsOpen(_ => !_)
  }

  function changeLanguage(lang: Language): MouseEventHandler {
    return _ => {
      setLanguage(lang)
      setIsOpen(false)
    }
  }
}
export default LangPicker

const dropDownBorderWidth = '1px'
const arrowBorderWidth = '6px'
const dropDownBorderColor = 'goldenrod'

const styles = {
  container: css({
    position: 'relative',
    alignSelf: 'stretch',
    display: 'flex',
    alignItems: 'center'
  }),

  dropDown: css({
    position: 'absolute',
    top: 'calc(100% + 0.2em + 6px)',
    right: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    background: params.title.bg,
    border: `${dropDownBorderWidth} solid ${dropDownBorderColor}`,

    '&::before': {
      content: `''`,
      width: `calc(2 * ${arrowBorderWidth})`,
      borderWidth: `0 ${arrowBorderWidth} ${arrowBorderWidth} ${arrowBorderWidth}`,
      borderStyle: 'solid',
      borderColor: `transparent transparent ${dropDownBorderColor} transparent`,
      position: 'absolute',
      top: `calc(-1 * ${dropDownBorderWidth} - ${arrowBorderWidth})`
    }
  }),

  langBtn: css({
    padding: '0.5em 0.5em 0.2em 0.5em',
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
      transition: 'color 0.3s',
      position: 'relative',

      '&:hover': {
        color: params.title.notCurrentLang.hoverColor
      },

      '&::after': {
        content: `''`,
        position: 'absolute',
        width: 'calc(100% - 1em)',
        left: '0.5em',
        bottom: '0.2em',
        border: `1px solid ${params.title.notCurrentLang.hoverColor}`,
        borderWidth: '1px 0',
        borderRadius: '50%',
        transition: 'opacity 0.3s',
        opacity: 0
      },

      '&:hover::after': {
        opacity: 1
      }
    }
  })
}
