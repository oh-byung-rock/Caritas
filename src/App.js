import './App.css';
import React,  {useState} from 'react';
import CustomerPage from './component/CustomerPage';
import LoginPage from './component/LoginPage';
import Item1Customer from './component/Item1Customer';
import Servertest from './component/servertest';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Question from './component/Question';

const GradeContext = React.createContext();

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [publicAge, setPublicAge] = useState(null);
  const [publicGender, setPublicGender] = useState(null);
  
  return (
    <GradeContext.Provider value={{ publicAge, setPublicAge, publicGender, setPublicGender }}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<CustomerPage currentUser={currentUser} setCurrentUser={setCurrentUser} />} exact />
            <Route path="/login" element={<LoginPage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="/question" element={<Question currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="/test" element={<Servertest />} />
          </Routes>
        </div>
      </Router>
    </GradeContext.Provider>
  );
}

export default App;
export { GradeContext };