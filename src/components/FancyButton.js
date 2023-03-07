import { useEffect } from 'react'
import styled from 'styled-components'

export const FancyButton = ({position, count, itemEm, border, radius, item, itemHeight, buttonBorder}) => {
  const itemPosition = Math.floor(count - position*2 - 1)
  const leftPosition = radius+ border - (radius**2 - (itemHeight*(1+2*itemPosition)/2)**2)**0.5
  const fontSize = 1.15

  const handleOnMouseMove = e => {
    const rect = e.target.getBoundingClientRect(),
    x = e.clientX - rect.left,
    y = e.clientY - rect.top

    e.target.style.setProperty("--mouse-x", `${x}px`)
    e.target.style.setProperty("--mouse-y", `${y}px`)
  }

  useEffect(() => {
    window.addEventListener("mousemove", handleOnMouseMove)
    return () => {
      window.removeEventListener("mousemove", handleOnMouseMove)
    }
  }, [])

  return (
    <Container className='button-container'
      position={leftPosition}
      font={itemEm}
      height={itemHeight}
      fontSize = {fontSize}
      border={border}
      buttonBorder={buttonBorder}
    >
      <button onClick={item.function}>{item.name}</button>
    </Container>
  )
}

const Container = styled.li`
  font-size: 16px;
  button{
    background-color: transparent;
    border-top: ${props => props.buttonBorder/props.fontSize }em solid;
    border-bottom: ${props => props.buttonBorder/props.fontSize}em solid;
    border-color: rgb(32 144 220);
    font-size: ${props => props.fontSize + "em"};
    height: ${props => props.font/props.fontSize + "em"};
    left: ${props => "-"+props.position+"px"};
    padding: 0 calc(${props => props.border+"px"} + 10px);
    position: relative;
    width: 100%;
    :hover{
      background-color: rgb(131 213 255 / 19%);
      border-color: rgb(32 144 220 / 60%);
    }
    ::before{
      background: radial-gradient(
        5em circle at var(--mouse-x) var(--mouse-y),
        rgb(177 228 255/ 50%),
        transparent 40%
      );
      border-radius: inherit;
      content: "";
      height: 100%;
      left: 0px;
      opacity: 0;
      position: absolute;
      top: 0px;
      transition: opacity 500ms;
      width: 100%;
      z-index: 2;
    }
    :hover::before{
      opacity: 1;
    }
  }
  :before{
    background-color: transparent;
    content: "";
    display: block;
    height: ${props => (props.font) + "em"};
  }
`