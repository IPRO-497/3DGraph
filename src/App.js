import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Block } from './pages/Block';
import { Github } from './pages/Github';
import { Home } from './pages/Home';
import { LeetCode } from './pages/LeetCode';
import { HandContext } from './hooks/HandContext';
import { useEffect, useRef, Suspense } from 'react';
import { ButtonStyle } from './pages/ButtonStyle';
import { MenuContext } from './hooks/MenuHook';
import { useState } from 'react';
import { Item } from './pages/Item';
import { Cart } from './pages/Cart';
import { GitLab } from './pages/GitLab';
import { Navbar } from './components/Navbar';
import { Success } from './pages/Success';
import cryptoJs from 'crypto-js';
import { LevaGUI } from './components/LevaGUI';
import { useProgress } from '@react-three/drei';
import { Loading } from './components/Loading';

function App() {
  const [itemList, setItemList] = useState([])
  const [show, setShow] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [cartItems, setCartItems] = useState(localStorage["cartItems"] ? JSON.parse(localStorage["cartItems"]) : {})
  const [uuid, setUuid] = useState()
  const {progress} = useProgress()
  const addToCart = (parameters) => {
    // e?.preventDefault()
    const quantity = parameters.quantity
    const download = parameters.download.checked
    const ship = parameters.ship.checked
    delete parameters.cart
    delete parameters.preview
    delete parameters.quantity
    delete parameters.download
    delete parameters.ship
    const tempCartItems = {...cartItems}
    if(download)tempCartItems[parameters.name + parameters.year + parameters.website + parameters.model+"download"] = {...parameters, download }
    if(ship)tempCartItems[parameters.name + parameters.year + parameters.website + parameters.model+"ship"] = {...parameters, ship, quantity }
    setCartItems(tempCartItems)
  }
  useEffect(() => {
    setCartCount(Object.keys(cartItems).length)
    localStorage["cartItems"] = JSON.stringify(cartItems)
  }, [cartItems, setCartCount])
  useEffect(() => {
    if(uuid)localStorage["uuid"] = cryptoJs.SHA256(uuid).toString()
  }, [uuid])
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
        <Suspense fallback={<Loading progress={progress}/>}>
          <Router>
            <Navbar />
            <LevaGUI />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path='/style/button' element={ <ButtonStyle />} />
                <Route exact path="/block" element={<Block />} />
                <Route exact path="/item" element={<Item />} />
                <Route exact path="/leetcode/:name/:year" element={<LeetCode />} />
                <Route exact path="/github/:name/:year" element={<Github />} />
                <Route exact path="/cart" element={<Cart setUuid={setUuid}/>} />
                <Route exact path="/gitlab/:name" element={<GitLab />} />
                <Route exact path="/success/:id" element={<Success />} />
            </Routes>
          </Router>
        </Suspense>
      </MenuContext.Provider>
    </HandContext.Provider>
  );
}

export default App;
