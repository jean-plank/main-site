/** @jsx jsx */
import { css, jsx, SerializedStyles } from '@emotion/core'
import * as A from 'fp-ts/lib/Array'
import * as O from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { randomInt } from 'fp-ts/lib/Random'
import { FunctionComponent, useContext, useEffect, useMemo, useState } from 'react'
import * as ReactDom from 'react-dom'

import barrelPng from '../../../img/barrel.png'
import gunpowderPng from '../../../img/gunpowder.png'
import sparklePng from '../../../img/sparkle.png'

import AppContext from '../../contexts/AppContext'
import fadeIn from '../../utils/css/fadeIn'
import media from '../../utils/css/media'

interface Props {
  sections: HTMLElement[]
}

const SiteMap: FunctionComponent<Props> = ({ sections }) => {
  const [current, setCurrent] = useState(-1)

  const parallaxRef = useContext(AppContext).parallaxRef

  const eltAndOnScroll = useMemo<O.Option<[HTMLElement, () => void]>>(
    () =>
      pipe(
        O.fromNullable(parallaxRef.current),
        O.map(elt => [elt, () => setCurrent(findCurrent(elt.scrollTop, sections))])
      ),
    [parallaxRef.current, setCurrent, sections]
  )

  useEffect(
    () =>
      pipe(
        eltAndOnScroll,
        O.fold(
          () => () => {},
          ([elt, onScroll]) => {
            onScroll()
            elt.addEventListener('scroll', onScroll)
            return () => elt.removeEventListener('scroll', onScroll)
          }
        )
      ),
    [eltAndOnScroll]
  )

  const sestionsWithRotation = useMemo(
    () => sections.map<[HTMLElement, number]>(_ => [_, randomInt(0, 359)()]),
    [sections]
  )

  return pipe(
    O.fromNullable(document.getElementById('overlay')),
    O.map(elt =>
      ReactDom.createPortal(
        <div css={styles.sitemap}>
          {sestionsWithRotation.map(([elt, deg], i) => (
            <div key={i} css={styles.wildfire} className={i === current ? 'current' : undefined}>
              <a href={`#${elt.id}`} css={styles.barrel}>
                <img src={barrelPng} css={rotate(deg)} />
              </a>
            </div>
          ))}
        </div>,
        elt
      )
    ),
    O.toNullable
  )
}
export default SiteMap

function findCurrent(scrollTop: number, sections: HTMLElement[]): number {
  const findCurrentRec = (
    sections: HTMLElement[],
    i: number,
    previousTop: number,
    acc: number
  ): number => {
    if (sections === []) return acc

    const [elt, ...tail] = sections
    const top = elt.offsetTop - scrollTop
    if (top >= 0) return top < -previousTop ? i : acc

    return findCurrentRec(tail, i + 1, top, i)
  }
  if (A.isEmpty(sections)) return -1
  return findCurrentRec(sections, 0, 0, 0)
}

function rotate(deg: number): SerializedStyles {
  return css({ transform: `rotate(${deg}deg)` })
}

const headerHeight = '4.9em'
const styles = {
  sitemap: css({
    position: 'fixed',
    top: headerHeight,
    left: '0.4vw',
    height: `calc(100vh - 2 * ${headerHeight})`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    opacity: 0,
    animation: fadeIn('1.5s', '0.75s'),

    [media.mobile]: {
      display: 'none'
    }
  }),

  wildfire: css({
    width: '4vw',
    height: '4vw',
    position: 'relative',

    '& + &': {
      marginTop: '12vh',

      '&::before': {
        height: 'calc(1vw + 12vh)',
        width: '60%',
        content: `''`,
        position: 'absolute',
        bottom: '3.5vw',
        left: '20%',
        backgroundImage: `url('${gunpowderPng}')`,
        backgroundSize: '100% 100%',
        zIndex: -1
      }
    }
  }),
  barrel: css({
    display: 'block',
    height: '100%',
    width: '100%',
    cursor: 'pointer',

    '& img': {
      height: '100%',
      width: '100%'
    },

    '&::after': {
      content: `''`,
      position: 'absolute',
      left: '4%',
      top: '17%',
      backgroundImage: `url('${sparklePng}')`,
      backgroundSize: '100% 100%',
      height: '66%',
      width: '66%',
      opacity: 0,
      transition: 'opacity 0.4s',

      '.current &': {
        opacity: 1
      }
    }
  })
}
