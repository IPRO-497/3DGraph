import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Block } from './pages/Block';
import { Github } from './pages/Github';
import { Home } from './pages/Home';
import { LeetCode } from './pages/LeetCode';
import { TensorFlow } from './pages/TensorFlow';
import { HandContext } from './hooks/HandContext';
import { useRef } from 'react';

function App() {
  return (
    <HandContext.Provider value={{
      leftConstant: useRef([]),
      rightConstant: useRef([]),
      leftCurrent: useRef([]),
      rightCurrent: useRef([]),
      positionConstant: useRef([]),
      rotationConstant: useRef([])
    }}>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/block" element={<Block />} />
          <Route exact path="/tensorflow" element={<TensorFlow />} />
          <Route exact path="/leetcode/:name/:year" element={<LeetCode />} />
          <Route exact path="/github/:name/:year" element={<Github />} />
        </Routes>
      </Router>
    </HandContext.Provider>
  );
}

export default App;
