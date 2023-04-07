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

function App() {
  const [itemList, setItemList] = useState([])
  const [show, setShow] = useState(false)
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
        itemList: itemList,
        show: show,
        setItemList: setItemList,
        setShow: setShow
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
