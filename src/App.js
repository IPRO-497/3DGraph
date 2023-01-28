import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Block } from './pages/Block';
import { Home } from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/block" element={<Block />} />
      </Routes>
    </Router>
  );
}

export default App;
