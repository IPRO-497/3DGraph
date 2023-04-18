import React, { useContext, useState } from 'react'
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
  width: 100%;
  .edit{
    padding: 0;
    font-size: 0.8em;
    display: flex;
    align-items: center;
    margin-right: 1em;
    color: #acacac;
    width: 2em;
  }
  .data-part{
    display: flex;
    flex-direction: row;
    width: calc(100% - 1.5em);
    p{
      width: 16.6666666667%;
      text-transform: capitalize;
      display: flex;
      align-items: center;
    }
  }
  button{
    padding: 0;
  }
`