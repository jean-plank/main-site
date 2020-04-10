/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FunctionComponent, useContext } from 'react'

import plage3Jpg from '../../img/plage3.jpg'
import jpPerduPng from '../../img/jp_perdu.png'

import AppContext from '../contexts/AppContext'
import fadeIn from '../utils/css/fadeIn'
import params from '../utils/css/params'

const NotFound: FunctionComponent = () => {
  const transl = useContext(AppContext).translation
  return (
    <div css={styles.container}>
      <img css={styles.imgBg} src={plage3Jpg} />
      <img css={styles.imgJp} src={jpPerduPng} />
      <div css={styles.messageContainer}>
        <div css={styles.message}>{transl.notFound.message}</div>
      </div>
    </div>
  )
}
export default NotFound

const styles = {
  container: css({
    height: '100%',
    position: 'relative'
  }),

  imgBg: css({
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }),

  imgJp: css({
    position: 'absolute',
    height: '80%',
    left: '2%',
    bottom: 0,
    animation: fadeIn('1.5s')
  }),

  messageContainer: css({
    position: 'absolute',
    height: '100%',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }),

  message: css({
    color: params.title.color,
    fontSize: '2rem',
    padding: '0.33em 0.67em',
    backgroundColor: params.title.bg,
    opacity: 0,
    animation: fadeIn('1.5s', '0.75s')
  })
}
