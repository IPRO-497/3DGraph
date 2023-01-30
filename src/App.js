import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Block } from './pages/Block';
import { Home } from './pages/Home';
import { LeetCode } from './pages/LeetCode';

function App() {
  // fetch("http://localhost:5000/leetcode?username=tayomide", {
  //   method: "GET"
  // })
  // .then(response => response.json())
  // .then(response => console.log(response))

  // fetch("http://localhost:5000/github?user=tayomide&year=2022", {
  //   method: "GET"
  // })
  // .then(response => response.json())
  // .then(response => console.log(response))

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/block" element={<Block />} />
        <Route exact path="/leetcode" element={<LeetCode />} />
      </Routes>
    </Router>
  );
}

export default App;
