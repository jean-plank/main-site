import styled from '@emotion/styled'

import labelJpg from '../../img/label.jpg'

export const Label = styled.div({
  maxWidth: '1100px',
  margin: '0 1.67em',
  background: `url('${labelJpg}')`,
  backgroundSize: 'cover',
  padding: '0.5em 1em 0.3em',
  border: '5px solid #8e6400',
  boxShadow: '0 0 10px black',
  fontSize: '0.9em'
})
