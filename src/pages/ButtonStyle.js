import styled from 'styled-components'
import { FancyButton } from '../components/FancyButton'
import { useState, useEffect } from 'react'

export const ButtonStyle = () => {
  const count = 6
  const afterPosition = count
  const itemEm = 2
  const border = 2
  const itemHeight = itemEm*16
  const circleRatio = 1.5
  const [radius, setRadius] = useState(window.innerWidth*circleRatio/2)
  const leftAfterPosition = radius + 1 + border - (radius**2 - (itemHeight*(1+2*afterPosition)/2)**2)**0.5
  const angle = Math.asin((count + 1/2)*itemHeight / radius)

  const resize = () => {
    setRadius(window.innerWidth*circleRatio/2)
  }

  useEffect(() => {
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
      >
      <div className='circle'></div>
      <svg className='svg'>
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0" stop-color="red" />
            <stop offset="30%" stop-color="red" />
            <stop offset="30%" stop-color="blue" />
            <stop offset="60%" stop-color="blue" />
            <stop offset="60%" stop-color="red" />
            <stop offset="100%" stop-color="red" />
          </linearGradient>
        </defs>
        <circle />
        Sorry, your browser does not support inline SVG.
      </svg> 
      <div className='list-container'>
        <ul className='button-list'>
          {
            new Array(count).fill(0).map((num, key) => <FancyButton
            key={key}
            position={key}
            count={count}
            itemEm={itemEm}
            border = {border}
            radius={radius}
          />)}
        </ul>
      </div>
    </Container>
  )
}

const Container = styled.div`
  .circle{
    width: ${props => props.ratio*100 + "%"};
    aspect-ratio: 1 / 1;
    background-color: white;
    position: fixed;
    left: -${props => props.ratio*50 + "%"};
    top: calc((100vh - ${props => props.ratio*100 + "vw"}) / 2);
    border-radius: 50%;
    ::before{
      content: "";
      position: absolute;
      inset: 0;
      border-radius: 50%;
      padding: ${props => props.border + "px"};
      background: conic-gradient(
        from ${props => (Math.PI/2 - props.angle)+"rad"},
        blue ${props => (2*props.angle)+"rad"},
        transparent ${props => (2*props.angle)+"rad"}
      );
      mask: 
        linear-gradient(#fff 0 0) content-box, 
        linear-gradient(#fff 0 0);
      mask-composite: xor;
      mask-composite: exclude;
    }
  }
  .svg{
    width: ${props => props.ratio*100 + "%"};
    aspect-ratio: 1 / 1;
    position: fixed;
    left: -${props => props.ratio*50 + "%"};
    top: calc((100vh - ${props => props.ratio*100 + "vw"}) / 2);
    circle{
      r: ${props => props.ratio*50}vw;
      cx: ${props => props.ratio*50}vw;
      cy: ${props => props.ratio*50}vw;
      stroke: url(#grad1);
      stroke-width: ${props => props.border}px;
      fill: red;
    }
  }
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
      li:nth-last-of-type(1)
      {
        ::after{
          content: "";
          display: block;
          height: ${props => props.font + "em"};
          position: relative;
          background-color: #ffffff;
          left: ${props => "-"+props.afterPosition+"px"};
        }
      }
    }
  }

`
