import styled from 'styled-components'
import { Leva } from 'leva'

export const LevaGUI = () => {
  return (
    <LevaContainer>
      <Leva />
    </LevaContainer>
  )
}

const LevaContainer = styled.div`
  > div{
    top: 36px;
  }
`
