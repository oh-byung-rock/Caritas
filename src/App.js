import './App.css';
import React,  {useState, useEffect} from 'react';
import CustomerPage from './component/CustomerPage';
import LoginPage from './component/LoginPage';
import Item1Customer from './component/Item1Customer';
import Servertest from './component/servertest';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Question from './component/Question';
import AlertBox from './component/Alertbox2';
const socket = new WebSocket('ws://localhost:7577');
const GradeContext = React.createContext();

function App() {
  var userdata=window.sessionStorage.getItem('currentUser')//$$$$세션 스토리지에서 유저 데이터 빼옴
  console.log('월곡동', userdata)
  if(userdata){//존재하면
    userdata=JSON.parse(userdata)//string 에서 json으로 변경
  }
  const [currentUser, setCurrentUser] = useState(userdata);//유저 상태값에 불러온 유저데이터 삽입 없으면 null
  const [publicAge, setPublicAge] = useState(null);
  const [publicGender, setPublicGender] = useState(null);
  const [publicBodyweight, setPublicBodyweight] = useState(null);
  const [publicDirectweight, setPublicDirectweight] = useState(null);
  const [publicIndirectweight, setPublicIndirectweight] = useState(null);
  const [publicmessage, setPublicmessage] = useState(null);
  const [message, setMessage] = useState(null);
  const [change, setChange] = useState(0);
  const [aa, setaa] = useState(null);

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if(data){
      if (data.event === 'commentAdded' && data.postId === currentUser.uid) {
        console.log('11');
        setChange(change+1)
        setMessage('답변이 완료되었습니다!');
        // 현재 시간의 타임스탬프를 aa의 값으로 설정
        setaa(new Date().getTime());
      } else {        
        console.log('22');
        // null 대신 랜덤 값을 aa의 값으로 설정
        setaa(Math.random());
      }
    }
  };
  /*
  useEffect(() => {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('cex')
      if(data){
        console.log(data)
        if (data.event === 'commentAdded' && data.postId === currentUser.uid) {
          console.log('11');
          setMessage('답변이 완료되었습니다!');
          // 현재 시간의 타임스탬프를 aa의 값으로 설정
          setaa(new Date().getTime());
        } else {        
          console.log('22');
          // null 대신 랜덤 값을 aa의 값으로 설정
          setaa(Math.random());
        }
      }
    };
    //버려
   return () => {
     // console.log("end")
     // socket.close();
   }
    
  }, [aa]);*/
  

  return (
    <GradeContext.Provider value={{ publicAge, setPublicAge, publicGender, setPublicGender 
    , publicBodyweight , setPublicBodyweight, publicDirectweight, setPublicDirectweight, publicIndirectweight, setPublicIndirectweight, publicmessage, setPublicmessage }}>
      <Router>
        <div className="App">
          <AlertBox message={message} change={change}/>
          <Routes>
            <Route path="/" element={<CustomerPage currentUser={currentUser} setCurrentUser={setCurrentUser}/>} exact />
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