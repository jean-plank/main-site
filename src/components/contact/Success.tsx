/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FunctionComponent, Fragment, useContext } from 'react'

import { Buttons } from './Buttons'
import { AppContext } from '../../contexts/AppContext'

interface Props {
  resetForm: () => void
}

export const Success: FunctionComponent<Props> = ({ resetForm }) => {
  const transl = useContext(AppContext).translation.contact

  return (
    <Fragment>
      <span css={styles.center}>
        <s>{transl.devsFateIsNowSealed}</s>
        <br />
        {transl.msgWasSent}
      </span>
      <Buttons.Default onClick={resetForm} css={styles.center}>
        <s>{transl.increaseTheSentence}</s>
        <br />
        {transl.submitAnotherAnswer}
      </Buttons.Default>
    </Fragment>
  )
}

const styles = {
  center: css({
    textAlign: 'center'
  })
}
