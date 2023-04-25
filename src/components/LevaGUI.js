import styled from 'styled-components'
import { Leva } from 'leva'
import { useLocation } from 'react-router-dom'

export const LevaGUI = () => {
  const location = useLocation()
  const className = location.pathname.split("/")[1] === "success" ? 
  "leva hide-leva" : "leva"
  return (
    <LevaContainer className={className}>
      <Leva />
    </LevaContainer>
  )
}

const LevaContainer = styled.div`
  > div{
    top: 36px;
  }
  &.hide-leva > div{
    top: 9999999999999999999px!important;
  }
`
