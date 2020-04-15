/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { FunctionComponent, Dispatch, SetStateAction, ChangeEvent, useContext } from 'react'

import { Maybe, pipe } from 'main-site-shared/lib/fp'

import { PrettyTargetBlank } from '../PrettyTargetBlank'
import { AppContext } from '../../contexts/AppContext'
import { DisplayableEndOutput } from '../../models/form'

interface Props {
  end: DisplayableEndOutput
  freeMsg: Maybe<string>
  setFreeMsg: Dispatch<SetStateAction<Maybe<string>>>
}

export const FormOutcome: FunctionComponent<Props> = ({ end, freeMsg, setFreeMsg }) => {
  const transl = useContext(AppContext).translation.contact

  switch (end._tag) {
    case 'Message':
      return <div css={styles.container}>{end.value(transl.form)}</div>

    case 'MessageLink':
      return (
        <PrettyTargetBlank href={end.link} css={styles.container}>
          {end.label(transl.form)}
        </PrettyTargetBlank>
      )

    case 'FreeMsg':
      return (
        <div css={styles.container}>
          {pipe(
            end.message,
            Maybe.fold(
              () => null,
              _ => <span css={styles.msg}>{_(transl.form)}</span>
            )
          )}
          <textarea
            value={Maybe.toUndefined(freeMsg)}
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
    setFreeMsg(Maybe.some(e.target.value))
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
