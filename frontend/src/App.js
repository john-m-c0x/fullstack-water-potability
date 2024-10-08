//React imports
import React from 'react';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
//Component imports
import TopAppBar from './components/TopAppBar';
//Page imports
import Landing from './pages/Landing'
import Home from './pages/Home'
import About from './pages/About'
import Data from './pages/Data'

function App() {
  return (
    <>
      <TopAppBar/>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/Home" element={<Home/>}/>
        <Route path="/About" element={<About/>}/>
        <Route path="/Data" element={<Data/>}/>
      </Routes>
    </>
  );
}

export default App;
