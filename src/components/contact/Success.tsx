/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FunctionComponent, Fragment } from 'react'

import { Buttons } from './Buttons'

interface Props {
  resetForm: () => void
}

export const Success: FunctionComponent<Props> = ({ resetForm }) => (
  <Fragment>
    <span css={styles.center}>
      <s>Les développeurs ont bien été condamnés.</s>
      <br />
      Le message a bien été envoyé.
    </span>
    <Buttons.Default onClick={resetForm} css={styles.center}>
      <s>Alourdir la peine</s>
      <br />
      Soumettre une autre réponse
    </Buttons.Default>
  </Fragment>
)

const styles = {
  center: css({
    textAlign: 'center'
  })
}
