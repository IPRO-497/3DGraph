import styled from 'styled-components'
import { FancyButton } from '../components/FancyButton'
import { useState, useEffect } from 'react'
import { useContext } from 'react'
import { MenuContext } from '../hooks/MenuHook'

export const ButtonStyle = () => {
  const {itemList} = useContext(MenuContext)
  const count = itemList.length
  const afterPosition = count
  const itemEm = 2.5
  const border = 2
  const itemBorder = 0.1
  const itemHeight = itemEm*16 
  const circleRatio = 1.5
  const [radius, setRadius] = useState(window.innerWidth*circleRatio/2)
  const leftAfterPosition = radius + 1 + border - (radius**2 - (itemHeight*(1+2*afterPosition)/2)**2)**0.5
  const angle = Math.asin((count + 1/2)*itemHeight / radius)
  const svgWidth = radius - ((radius-2*border)**2 - ((2*(count-1) + 1)*itemHeight/2)**2)**0.5
  const circleX = svgWidth - (window.innerWidth*3/4)

  const resize = () => {
    setRadius(window.innerWidth*circleRatio/2)
  }

  const itemPosition = (position) => {
    return Math.floor(count - position*2 - 1)
  }

  useEffect(() => {
    resize()
    window.addEventListener("resize", resize)
  
    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])
  

  return (
    <Container
      afterPosition={leftAfterPosition}
      font={itemEm}
      border={border}
      angle={angle}
      ratio={circleRatio}
      svgWidth={svgWidth}
      circleWidth={circleX}
      buttonBorder={itemBorder}
    >
      <svg className='svg'>
        <defs>
        {
          new Array(count).fill(0).map((num, key) =>
          <linearGradient key={key} id={"grad"+ key} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0" stopColor="transparent" />
            <stop offset={(radius - itemHeight/2)/(2*radius) - itemPosition(key)*itemHeight/(2*radius)} stopColor="transparent" />
            <stop offset={(radius - itemHeight/2)/(2*radius) - itemPosition(key)*itemHeight/(2*radius)} stopColor="#2090dc" />
            <stop offset={(radius - itemHeight/2)/(2*radius) + itemHeight/(2*radius) - itemPosition(key)*itemHeight/(2*radius)} stopColor="#2090dc" />
            <stop offset={(radius - itemHeight/2)/(2*radius) + itemHeight/(2*radius) - itemPosition(key)*itemHeight/(2*radius)} stopColor="transparent" />
            <stop offset="1.0" stopColor="transparent" />
          </linearGradient>
          )}
        </defs>
        {new Array(count).fill(0).map((num, key) => <circle key={key} stroke={"url(#grad"+key+")"}/>)}
        Sorry, your browser does not support inline SVG.
      </svg>
      <div className='list-container'>
        <ul className='button-list'>
          {
            itemList.map((item, key) => <FancyButton
            key={key}
            position={key}
            count={count}
            itemEm={itemEm}
            border = {border}
            radius={radius}
            item={item}
            itemHeight={itemHeight}
            buttonBorder={itemBorder}
          />)}
        </ul>
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 0;
  width: 0;
  position: fixed;
  z-index: 1;
  .list-container{
    position: fixed;
    z-index: 2;
    width: max-content;
    display: flex;
    align-items: center;
    height: 100vh;
    left: ${props => props.ratio*50 + "%"};
    .button-list{
      position: relative;
      li:nth-last-of-type(1){
        ::after{
          content: "";
          display: block;
          height: ${props =>(props.font) + "em"};
          position: relative;
          background-color: transparent;
        }
      }
    }
  }
  .svg{
    height: 100vh;
    width: ${props => props.svgWidth}px;
    top: 0;
    aspect-ratio: 1 / 1;
    position: fixed;
    right: 25%;
    /* top: calc((100vh - ${props => props.ratio*100 + "vw"}) / 2); */
    circle{
      r: calc(${props => props.ratio*50}vw - ${props => props.border}px);
      cx: ${props => props.circleWidth}px;
      cy: 50vh;
      stroke-width: ${props => props.border}px;
      fill: transparent;
      /* stroke: url(#${props => props.id}); */
    }
  }
`
