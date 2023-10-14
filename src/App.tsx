import React from 'react';
import thd from './resource/thd.png'
import './App.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import Sapphire from './features/sapphire';
import Home from './features/home';
import Error from './features/err';
import axios from 'axios';

function App() {
  const handleClick = async () => {
    const data = await axios.get('http://lykfw.cc:7001/player/info/76561198072887807')
    console.log(data.data.data.response.players[0])
    console.log(data.data.data.response.players[0]["personaname"])
}

  return (
    <div className="App" >
      <header>
        <nav>
          <NavLink to='home' style={{ margin: '10px' }} className="App-fonts">首页</NavLink>
          <NavLink to='sapphire' style={{ margin: '10px' }} className="App-fonts">蓝宝石</NavLink>
          <button onClick={handleClick} style={{ width: '20px', height: '20px' }} className="App-fonts">测试</button>
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
