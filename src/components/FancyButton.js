import styled from 'styled-components'

export const FancyButton = ({position, count, itemEm, border, radius}) => {
  console.log(radius)
  const itemPosition = Math.abs(Math.floor(count - position*2 - 1))
  const beforePosition = Math.abs(Math.floor(count - position*2 - 1) + 1)
  const itemHeight = itemEm*16
  // const radius = 75*window.innerWidth/100
  const leftPosition = radius+ border - (radius**2 - (itemHeight*(1+2*itemPosition)/2)**2)**0.5
  const leftBeforePosition = radius+1+ border - (radius**2 - (itemHeight*(1+2*beforePosition)/2)**2)**0.5
  // Added one because it didn't hurt to add 1. Think of it like an error margin
  const fontSize = 1.25
  return (
    <Container className='button-container'
      position={leftPosition}
      beforePosition={leftBeforePosition}
      font={itemEm}
      fontSize = {fontSize}
      border={border}
    >
      <button>Tomiwa</button>
    </Container>
  )
}

const Container = styled.li`
  font-size: 16px;
  button{
    padding: 0 calc(${props => props.border+"px"} + 10px);
    font-size: ${props => props.fontSize + "em"};
    line-height: ${props => props.font/props.fontSize + "em"};
    position: relative;
    left: ${props => "-"+props.position+"px"};
  }
  :before{
    content: "";
    display: block;
    height: ${props => props.font + "em"};
    position: relative;
    left: ${props => "-"+props.beforePosition+"px"};
    background-color: #ffffff;
  }
`