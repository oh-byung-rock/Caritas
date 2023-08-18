import './App.css';
import React from 'react';
import CustomerPage from './component/CustomerPage';
import LoginPage from './component/LoginPage';
import Servertest from './component/servertest';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* exact : 하위조소에대한 중복방지기능, 예를들면 '/', '/home', '/home/one', '/home/two' 가 있으면 '/', '/home' 에 대해서만 exact */}
          <Route path="/" element={<CustomerPage />} exact />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/test" element={<Servertest />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
