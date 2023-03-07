import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Block } from './pages/Block';
import { Github } from './pages/Github';
import { Home } from './pages/Home';
import { LeetCode } from './pages/LeetCode';
import { HandContext } from './hooks/HandContext';
import { useRef } from 'react';
import { ButtonStyle } from './pages/ButtonStyle';
import { MenuContext } from './hooks/MenuHook';

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
          <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path='/style/button' element={ <ButtonStyle />} />
              <Route exact path="/block" element={<Block />} />
              <Route exact path="/leetcode/:name/:year" element={<LeetCode />} />
              <Route exact path="/github/:name/:year" element={<Github />} />
          </Routes>
        </Router>
      </MenuContext.Provider>
    </HandContext.Provider>
  );
}

export default App;
