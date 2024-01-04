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
  var userdata=window.sessionStorage.getItem('currentUser')//$$$$세션 스토리지에서 유저 데이터 빼옴
  if(userdata){//존재하면
    userdata=JSON.parse(userdata)//string 에서 json으로 변경
  }
  const [currentUser, setCurrentUser] = useState(userdata);//유저 상태값에 불러온 유저데이터 삽입 없으면 null
  const [publicAge, setPublicAge] = useState(null);
  const [publicGender, setPublicGender] = useState(null);
  const [publicBodyweight, setPublicBodyweight] = useState(null);
  const [publicDirectweight, setPublicDirectweight] = useState(null);
  const [publicIndirectweight, setPublicIndirectweight] = useState(null);
  return (
    <GradeContext.Provider value={{ publicAge, setPublicAge, publicGender, setPublicGender 
    , publicBodyweight , setPublicBodyweight, publicDirectweight, setPublicDirectweight, publicIndirectweight, setPublicIndirectweight }}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<CustomerPage currentUser={currentUser} setCurrentUser={setCurrentUser} />} exact />
            <Route path="/login" element={<LoginPage currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            <Route path="/question" element={<Question currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
            {/* <Route path="/c" element={<CustomerPage currentUser={currentUser} setCurrentUser={setCurrentUser} ab={'item-1-1'}/>} /> */}
            <Route path="/test" element={<Servertest />} />
          </Routes>
        </div>
      </Router>
    </GradeContext.Provider>
  );
}

export default App;
export { GradeContext };