import React, { useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { MenuContext } from '../hooks/MenuHook'

export const Navbar = () => {
  // Elements: Home, Add item, Cart, Menu for Menu
  const refCont = useRef()
  const {cartCount} = useContext(MenuContext)

  useEffect(() => {
    const refTemp = refCont.current
    const handleOnMouseMove = e => {
      e.stopPropagation()
      const x = e.clientX, y = e.clientY
      refTemp.style.setProperty("--mouse-x", `${x}px`)
      refTemp.style.setProperty("--mouse-y", `${y}px`)
    }
    refTemp.addEventListener("mousemove", handleOnMouseMove)
    return () => {
      refTemp.addEventListener("mousemove", handleOnMouseMove)
    }
  }, [])

  return (
    <Container cart={cartCount} ref={refCont} className='nav'>
      <ul className='nav-list'>
        <li className='home-container'>
          <Link to="./" className='home'>Home</Link>
        </li>
        <li className='actions-container'>
          <ul className='actions-list'>
            <li>
              <Link to="./item" className='item'>Add Item</Link>
            </li>
            <li>
              <Link to="./cart" className='cart'>Cart</Link>
            </li>
            {/* <li>
              <button className='menu'>Menu</button>
            </li> */}
          </ul>
        </li>
      </ul>
    </Container>
  )
}

const Container = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 3;
  font-size: 1.08em;
  background: rgb(32 144 220 / 10%);
  color: #12037e;
  ::before{
    background: radial-gradient(
      5em circle at var(--mouse-x) var(--mouse-y),
      rgb(177 228 255/ 75%),
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
  button{
    font-size: 1em;
    color: inherit;
  }
  button, a{
    cursor: pointer;
    position: relative;
    z-index: 3;
    font-weight: bold;
    padding: .5em 0;
  }
  ul{
    display: flex;
    flex-direction: row;
  }
  .nav-list{
    justify-content: space-between;
    > li{
      padding: 0 .5em;
    }
    .home-container, .actions-list li{
      display: flex;
      flex-direction: row;
    }
    .actions-container{
      min-width: 20%;
      .actions-list{
        justify-content: space-between;
        .cart::after{
          content: ${props => props.cart !== 0 && "'" + props.cart + "'"};
          border-left: 1px solid black;
          padding-left: .5ch;
          margin-left: .5ch;
          font-size: 0.9em;
          line-height: 1.11111111111em; // 1/0.9
        }
      }
    }
  }
  
`
