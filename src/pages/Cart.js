import React, { useContext } from 'react'
import styled from "styled-components"
import { CartItem } from '../components/CartItem'
import { MenuContext } from '../hooks/MenuHook'
import { v4 as uuidv4 } from 'uuid';
import { useLocation } from 'react-router-dom';

export const Cart = ({setUuid}) => {
  // const [cartItems, setCartItems] = useState(
  //   JSON.parse(localStorage["cartItems"]) ||
  //   {}
  // )
  const locate = useLocation()
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
      <div className='cart'>
        <h1>CART PAGE</h1>
        <p>Complete Your Purchase</p>
        <ul className='table-name'>
          <li>
            <p>Username</p>
          </li>
          <li>
            <p>Year</p>
          </li>
          <li>
            <p>Website</p>
          </li>
          <li>
            <p>Datatype</p>
          </li>
          <li>
            <p>Type</p>
          </li>
          <li>
            <p>Quantity</p>
          </li>
        </ul>
        <ul className='cart-items'>
          {Object.values(cartItems).map((item, key) => <CartItem key={key} parameters={item} setCartItems={setCartItems}/>)}
        </ul>
        <button onClick={checkout} className='cart-checkout'>Checkout</button>
      </div>
    </Container>
  )
}

// Make a random number just before redirecting to stripe. Let stripe use that random number as the success link.
// If the redirect success link is the same as that number then download the items for them.

// price_1MrsfJI1aNradUj24XS9HdlY - Github Contribution Download

const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  margin-top: 3em;
  height: 100%;
  width: 100%;
  .cart{
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 50em;
    padding: 3em 3em 3em 3em;
    background-color: #fafafa;
    border-radius: 0.2em;
    h1{
      width: 100%;
      text-align: center;
      margin-bottom: 0.2em;
    }
    > p{
      width: 100%;
      text-align: center;
      margin-bottom: 3em;
    }
    .table-name{
      display: flex;
      flex-direction: row;
      width: calc(100% - 3.5em);
      margin-left: 2em;
      color: #acacac;
      border-bottom: 1px solid #cdcdcd;
      padding-bottom: 0.7em;
      li{
        width: 16.6666666667%;
      }
    }
    .cart-items{
      padding-top: 1.6em;
      display: flex;
      flex-direction: column;
      gap: 1em;
    }
    .cart-checkout{
      background-color: black;
      color: white;
      font-size: 1em;
      height: 2.2em;
      margin-top: 1.6em;
    }
  }
`
