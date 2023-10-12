import React from 'react';
import thd from './resource/thd.png'
import './App.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import Sapphire from './features/sapphire';
import Home from './features/home';
import Error from './features/err';

function App() {
  return (
    <div className="App" >
      <header>
        <nav>
          <NavLink to='home' style={{ margin: '10px' }} className="App-fonts">首页</NavLink>
          <NavLink to='sapphire' style={{ margin: '10px' }} className="App-fonts">蓝宝石</NavLink>
        </nav>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path="/sapphire" element={<Sapphire />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
