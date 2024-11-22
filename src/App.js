import logo from './logo.svg';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import Incio from './views/Inicio';
import Login from './views/Login';
import Register from './views/Register';
import Home from './views/Home';

function App() {
  return (
    <Routes>     
      <Route path='/' element={<Home/>}/> 
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Incio' element={<Incio/>}/>
      <Route path='/Register' element={<Register/>}/>
    </Routes>
  );
}

export default App;
