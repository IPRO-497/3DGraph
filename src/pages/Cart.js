import React, { useContext } from 'react'
import styled from "styled-components"
import { CartItem } from '../components/CartItem'
import { MenuContext } from '../hooks/MenuHook'
import { v4 as uuidv4 } from 'uuid';

export const Cart = ({setUuid}) => {
  // const [cartItems, setCartItems] = useState(
  //   JSON.parse(localStorage["cartItems"]) ||
  //   {}
  // )
  const {setCartItems, cartItems} = useContext(MenuContext)

  const checkout = (e) => {
    const uuid = uuidv4()
    setUuid(uuid)
    fetch(`/.netlify/functions/stripe?origin=${window.location.origin}`,{
      method: 'POST',
      body: JSON.stringify({...cartItems, guid: uuid}),
      headers: {'Content-Type': 'application/json'}
    })
    .then(response => response.json())
    .then(response => {
      window.location.assign(response.url)
    })
    .catch(e => console.log(e))
  }

  return (
    <Container>
      {Object.values(cartItems).map((item, key) => <CartItem key={key} parameters={item} setCartItems={setCartItems}/>)}
      <button onClick={checkout}>Checkout</button>
    </Container>
  )
}

// Make a random number just before redirecting to stripe. Let stripe use that random number as the success link.
// If the redirect success link is the same as that number then download the items for them.

// price_1MrsfJI1aNradUj24XS9HdlY - Github Contribution Download

const Container = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 4em 0;
`
