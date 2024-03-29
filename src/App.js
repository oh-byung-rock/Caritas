import './App.css';
import React,  {useState, useEffect} from 'react';
import CustomerPage from './component/CustomerPage';
import LoginPage from './component/LoginPage';
import Item1Customer from './component/Item1Customer';
import Servertest from './component/servertest';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Question from './component/Question';
import AlertBox from './component/Alertbox2';
import Inquiry from './component/Inquiry';
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

  // socket.onmessage = (event) => {
  //   const data = JSON.parse(event.data);
  //   if(data){
  //     if (data.event === 'commentAdded' && data.postId === currentUser.uid) {
  //       console.log('11');
  //       setChange(change+1)
  //       setMessage('답변이 완료되었습니다!');
  //     } else {        
  //       console.log('22');
  //     }
  //   }
  // };
  
// ▼ 의존성 배열이 비어있든 채워져있든 일단 useeffect는 실행됩니다.
// 이 중에서 socket.onmessage는 서버에서 socket.onmessage 이벤트 핸들러가 작동될때 실행됩니다.
// 이벤트 핸들러가 작동되면 chage값은 setchange에 의해 1로 변경되면서 setmessage도 변경됩니다.
// 이후 alertbox2에서 useeffect에의해 실행됩니다.
// 여기서 클라에서 socket.onmessage가 작동되는것을 메일확인, setstate의 변화를 새로운메일이 오는것
// 이라고 비유를 할수있습니다. 의존성 배열이 비어있으면 처음 로그인할때 한번 메일을 확인합니다.
// 물론 의존성 배열이 비어있더라고 console.log('11')은 작동합니다. 다만 메일확인을 안할뿐
// 의존성 배열이 채워져있다면 새로운 메일이 올때마다 메일확인을 합니다.
// 이 차이입니다.

  useEffect(() => {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if(data){
        console.log("여길봐0",data)
        console.log("여길봐1",data.data.postId)
        console.log("여길봐2",currentUser.uid)
        console.log("여길봐3",data.event)
        if (data.event === 'commentAdded' && data.data.postId === currentUser.uid) {
          // ▼ [] 일때 와 [change]일때 둘다 console.log('11'); 가 작동한다.
          console.log('119119');
          setChange(change+1)
          setMessage('답변이 완료되었습니다!');
        } else {        
          console.log('22');
        }
      }
    };
  }, [change]);


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
            <Route path="/inquiry" element={<Inquiry currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
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