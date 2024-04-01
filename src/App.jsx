
import Sidebaradmin from './Admin/Sidebaradmin';
import './App.css';
// import Index from './Admin/Index';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <Router>
      
      <Routes>
        <Route path='/admin' element={<Sidebaradmin />}/>
        
      </Routes>
      
      </Router>

  );
}

export default App;
