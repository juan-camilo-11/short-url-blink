import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './pages/layout/layout';
import Home from './pages/home/home';
import "pure-ui-web-components";
import "./index.css";
import Auth from './pages/auth/auth';

function App() {
  return (
    <Router basename='/short-url-blink'>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/auth" element={<Auth/>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
