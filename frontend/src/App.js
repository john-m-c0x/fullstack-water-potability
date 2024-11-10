//React imports
import React from 'react';
import { Routes, Route } from 'react-router-dom';
//Component imports
import Home from './pages/Home';
import Data from './pages/Data';
import About from './pages/About';
import TopAppBar from './components/TopAppBar';
import { Box } from '@mui/material';
import Landing from './pages/Landing';

function App() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <TopAppBar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home />} />
          <Route path="/data" element={<Data />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
