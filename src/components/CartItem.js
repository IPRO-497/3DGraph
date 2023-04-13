import React, { useContext } from 'react'
import styled from 'styled-components'
import { MenuContext } from '../hooks/MenuHook'
import CloseIcon from '@mui/icons-material/Close';

export const CartItem = ({parameters}) => {
  const {setCartItems} = useContext(MenuContext)
  const deleteItem = (e) => {
    e.preventDefault()
    setCartItems((prevCartItems) => {
      delete prevCartItems[parameters.name + parameters.year + parameters.website + parameters.model+(parameters.ship? "ship" : "download")]
      return {...prevCartItems}
    })
  }
  return (
    <Container>
      <button className='edit'>Edit</button>
      <div className='data-part'>
        <p>{parameters.name}</p>
        <p>{parameters.year}</p>
        <p>{parameters.website}</p>
        <p>{parameters.model}</p>
        <p>{parameters.ship ? "ship" : "download"}</p>
        <p>{parameters.ship ? parameters.quantity : 1}</p>
      </div>
      <button onClick={deleteItem}>
        <CloseIcon />
      </button>
    </Container>
  )
}

const Container = styled.li`
  display: flex;
  flex-direction: row;
  gap: 2ch
`