import { createContext } from 'react'

export const MenuContext = createContext({
  show: false,
  setShow: () => {},
  itemList: [],
  setItemList: () => {},
  cartItems: {},
  setCartItems: () => {},
  addToCart: () => {},
  cartCount: 0,
  setCartCount: () => {}
})