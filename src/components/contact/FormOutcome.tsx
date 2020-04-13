/** @jsx jsx */
import * as O from 'fp-ts/lib/Option'
import { css, jsx } from '@emotion/core'
import { Option } from 'fp-ts/lib/Option'
import { pipe } from 'fp-ts/lib/pipeable'
import { FunctionComponent, Dispatch, SetStateAction, ChangeEvent, useContext } from 'react'

import { PrettyTargetBlank } from '../PrettyTargetBlank'
import AppContext from '../../contexts/AppContext'
import { DisplayableEndOutput } from '../../models/choices'

interface Props {
  end: DisplayableEndOutput
  freeMsg: Option<string>
  setFreeMsg: Dispatch<SetStateAction<Option<string>>>
}

export const FormOutcome: FunctionComponent<Props> = ({ end, freeMsg, setFreeMsg }) => {
  const transl = useContext(AppContext).translation.contact

  switch (end._tag) {
    case 'Message':
      return <div css={styles.container}>{end.value}</div>

    case 'MessageLink':
      return (
        <PrettyTargetBlank href={end.link} css={styles.container}>
          {end.label}
        </PrettyTargetBlank>
      )

    case 'FreeMsg':
      return (
        <div css={styles.container}>
          {pipe(
            end.message,
            O.fold(
              () => null,
              _ => <span css={styles.msg}>{_}</span>
            )
          )}
          <textarea
            value={O.toUndefined(freeMsg)}
            onChange={updateFreeMsg}
            autoFocus={true}
            placeholder={transl.freeMsgPlaceholder}
            rows={4}
            css={styles.textarea}
          />
        </div>
      )
  }

  function updateFreeMsg(e: ChangeEvent<HTMLTextAreaElement>) {
    setFreeMsg(O.some(e.target.value))
  }
}

const styles = {
  container: css({
    marginBottom: '0.9em'
  }),

  msg: css({
    display: 'block',
    marginBottom: '0.15em'
  }),

  textarea: css({
    width: '100%',
    resize: 'vertical',
    fontFamily: 'monospace',
    fontWeight: 'bold',
    fontSize: '0.8em',
    padding: '0.3em',
    border: '4px solid #d7cc9e',
    backgroundColor: '#e9e1c1',

    '&:hover, &:focus': {
      borderColor: '#aeab9a'
    }
  })
}
