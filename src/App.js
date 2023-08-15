import './App.css';
import React from 'react';
import CustomerPage from './component/CustomerPage';
import LoginPage from './component/LoginPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<CustomerPage />} exact />
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
