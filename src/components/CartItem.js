import React, { useContext } from 'react'
import styled from 'styled-components'
import { MenuContext } from '../hooks/MenuHook'


export const CartItem = ({parameters}) => {
  const {setCartItems} = useContext(MenuContext)
  const deleteItem = (e) => {
    e.preventDefault()
    setCartItems((prevCartItems) => {
      delete prevCartItems[parameters.name + parameters.year + parameters.website + parameters.model]
      return {...prevCartItems}
    })
  }
  return (
    <Container>
      <p>{parameters.name}</p>
      <p>{parameters.year}</p>
      <p>{parameters.website}</p>
      <p>{parameters.model}</p>
      {parameters.ship && <p>Ship {parameters.quantity} models</p>}
      {parameters.download && <p>Download model</p>}
      <button>Edit</button>
      <button onClick={deleteItem}>Delete</button>
    </Container>
  )
}

const Container = styled.li`
  display: flex;
  flex-direction: row;
  gap: 2ch
`