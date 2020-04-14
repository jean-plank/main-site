/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FunctionComponent, useState } from 'react'

import bgNotFoundJpg from '../../../img/bg_not_found.jpg'

import { Form } from './Form'
import { Success } from './Success'
import { fontFamily } from '../../utils/css/fonts'

export const Contact: FunctionComponent = () => {
  const [showSuccess, setShowSuccess] = useState<boolean>(false)

  return (
    <div css={styles.contact}>
      <div css={styles.container}>
        <div css={styles.form}>
          {showSuccess ? <Success resetForm={resetForm} /> : <Form onSubmit={onSubmit} />}
        </div>
      </div>
    </div>
  )

  function onSubmit() {
    setShowSuccess(true)
  }

  function resetForm() {
    setShowSuccess(false)
  }
}

const styles = {
  contact: css({
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    paddingTop: '2.1em',
    background: `url('${bgNotFoundJpg}')`,
    backgroundSize: 'cover'
  }),

  container: css({
    border: '10px double #b59458',
    color: 'black',
    width: 'calc(100% - 2em)',
    maxWidth: '1400px',
    minHeight: '70%',
    display: 'flex',
    alignItems: 'stretch',
    fontFamily: fontFamily.baloopaaji2,
    letterSpacing: '-1px',
    fontSize: '0.8em'
  }),

  form: css({
    backgroundColor: '#f6f0cd',
    width: '100%',
    padding: '1em 1em 0.67em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between'
  })
}
