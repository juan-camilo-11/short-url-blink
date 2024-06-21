import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './pages/layout/layout';
import Home from './pages/home/home';
import "pure-ui-web-components";
import "./index.css";
import Auth from './pages/auth/auth';
import Dashboard from './pages/dashboard/dashboard';
import Logout from './pages/auth/logout';

function App() {
  return (
    <Router basename='/short-url-blink'>
      <Layout>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/logout" element={<Logout/>} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
