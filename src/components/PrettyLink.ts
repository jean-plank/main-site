import styled from '@emotion/styled'

export const PrettyLink = styled.a({
  display: 'inline-block',
  color: 'inherit',
  transition: 'all 0.2s',
  padding: '0.1em',

  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  }
})
