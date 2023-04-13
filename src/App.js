import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Block } from './pages/Block';
import { Github } from './pages/Github';
import { Home } from './pages/Home';
import { LeetCode } from './pages/LeetCode';
import { HandContext } from './hooks/HandContext';
import { useEffect, useRef } from 'react';
import { ButtonStyle } from './pages/ButtonStyle';
import { MenuContext } from './hooks/MenuHook';
import { useState } from 'react';
import { Item } from './pages/Item';
import { Cart } from './pages/Cart';
import { GitLab } from './pages/GitLab';
import { Navbar } from './components/Navbar';
import cryptoJs from 'crypto-js';

function App() {
  const [itemList, setItemList] = useState([])
  const [show, setShow] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [cartItems, setCartItems] = useState(localStorage["cartItems"] ? JSON.parse(localStorage["cartItems"]) : {})
  const addToCart = (parameters) => {
    // e?.preventDefault()
    parameters.ship = parameters.ship.checked
    parameters.download = parameters.download.checked
    delete parameters.cart
    delete parameters.preview
    const tempCartItems = {...cartItems}
    tempCartItems[parameters.name + parameters.year + parameters.website + parameters.model] = parameters 
    setCartItems(tempCartItems)
  }
  useEffect(() => {
    setCartCount(Object.keys(cartItems).length)
    localStorage["cartItems"] = JSON.stringify(cartItems)
  }, [cartItems, setCartCount])
  return (
    <HandContext.Provider value={{
      leftConstant: useRef([]),
      rightConstant: useRef([]),
      leftCurrent: useRef([]),
      rightCurrent: useRef([]),
      positionConstant: useRef([]),
      rotationConstant: useRef([])
    }}>
      <MenuContext.Provider value={{
        cartCount: cartCount,
        itemList: itemList,
        show: show,
        cartItems: cartItems,
        setItemList: setItemList,
        setShow: setShow,
        setCartCount: setCartCount,
        setCartItems: setCartItems,
        addToCart: addToCart
      }}>
        <Router>
          <Navbar />
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path='/style/button' element={ <ButtonStyle />} />
              <Route exact path="/block" element={<Block />} />
              <Route exact path="/item" element={<Item />} />
              <Route exact path="/leetcode/:name/:year" element={<LeetCode />} />
              <Route exact path="/github/:name/:year" element={<Github />} />
              <Route exact path="/cart" element={<Cart />} />
              <Route exact path="/gitlab/:name" element={<GitLab />} />
          </Routes>
        </Router>
      </MenuContext.Provider>
    </HandContext.Provider>
  );
}

export default App;
