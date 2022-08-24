import React from 'react';
import './App.css';
import './styles.css';
import Layout from './Components/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Components/HomePage';
import Profile from './Components/Profile';
import Contact from './Components/Contact';
import NotFound from './Components/NotFound';
import Admin from './Components/Blog/Admin';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/_admin/*' element={<Admin />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
