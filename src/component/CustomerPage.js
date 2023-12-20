import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import anany from '../assets/anany.png'
import Item1Customer from './Item1Customer';
import Item1NonCustomer from './Item1NonCustomer';
import Item11Customer from './Item11Customer';
import Item11NonCustomer from './Item11NonCustomer';
import Inquiry from './Inquiry';
import Question from './Question';
import Servertest from './servertest';
import Col2 from './Col2';
import Navbar from './Navbar';


function CustomerPage({ currentUser, setCurrentUser }) {
  
  const [selectedItem, setSelectedItem] = useState('item-0');
  const [name, setName] = useState('사용자 이름');
  const [photoURL, setPhotoURL] = useState(anany);

  const [gender, setGender] = useState('성별');
  const [age, setAge] = useState('나이');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('체중');

  const [isEditingHeight, setIsEditingHeight] = useState(false);
  const [newHeight, setNewHeight] = useState(height);

  const [isEditingBenchPressWeight, setIsEditingBenchPressWeight] = useState(false);
  const [isEditingBenchPressTimes, setIsEditingBenchPressTimes] = useState(false);
  const [BenchPressWeight, setBenchPressWeight] = useState("0");
  const [BenchPressTimes, setBenchPressTimes] = useState("0");
  const [newBenchPressWeight, setNewBenchPressWeight] = useState(BenchPressWeight);
  const [newBenchPressTimes, setNewBenchPressTimes] = useState(BenchPressTimes);
  const [exp1rm, setexp1rm] = useState(0);


  // 스쿼트 관련 상태변수
  const [isEditingSquatWeight, setIsEditingSquatWeight] = useState(false);
  const [isEditingSquatTimes, setIsEditingSquatTimes] = useState(false);
  const [SquatWeight, setSquatWeight] = useState("0");
  const [SquatTimes, setSquatTimes] = useState("0");
  const [newSquatWeight, setNewSquatWeight] = useState(SquatWeight);
  const [newSquatTimes, setNewSquatTimes] = useState(SquatTimes);
  const [squatExp1rm, setSquatExp1] = useState(0);
  // 스쿼트 관련 상태변수

  // 반응형 메뉴바 상태변수
  const [showSidebar, setShowSidebar] = useState(false); 
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // col2 반응형 상태변수
  const [colWidth, setColWidth] = useState('85%');
  const [leftMargin, setLeftMargin] = useState('15%');

  const navigate = useNavigate();

  const handleSubmitField = async (field, value, setOriginalValue, setIsEditing) => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (user) {
      try {
        const firestore = getFirestore();
        const customerDocRef = doc(firestore, "customer", user.uid);
  
        await updateDoc(customerDocRef, {
          [field]: value,
        });

        setOriginalValue(value);
        setIsEditing(false);
      } catch (error) {
        console.log(`${field} 업데이트에 실패하였습니다.`, error);
      }
    }
  };
  
  

  const handleLogout = async () => {
    try {
      // 로그아웃 세트
      const auth = getAuth();
      await signOut(auth);
      // 로그아웃 세트
      setCurrentUser(null);
      setName('사용자 이름');
      setPhotoURL(anany); 
      console.log("a1")
      setGender('성별');
      setAge('나이');
      setHeight('');
      setWeight('체중');
      setBenchPressWeight('0');
      setBenchPressTimes('0');
      window.location.reload();
    } catch (error) {
      alert('로그아웃 실패');
      console.log('로그아웃 에러:', error);
    }
    window.addEventListener('beforeunload', handleLogout);
    return () => {
        window.removeEventListener('beforeunload', handleLogout);
    };
  };

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

/* navbar 기준 1400px 초과 ▶ 이내로 전환시 메뉴바버튼으로 다시 띄우기 */
  useEffect(() => {
    if (windowWidth >= 1400) {
      setShowSidebar(false);
    }
  }, [windowWidth]);

  useEffect(() => {
   // const info = JSON.parse(window.sessionStorage.getItem("kol"));
    // 질문1 : new Promise.all 이런거 쓰면서 까지 이미지처리를 하는데도 저 이미지하나만 로그아웃이 안됨
   // if (!info) {
    //  handleLogout(); 
    //}
    //##############이부분이
  }, []); 

 /* useEffect(() => {
    console.log('두배')
    console.trace('d')
    const auth = getAuth();
    // onAuthStateChanged 는 기본적으로 firebase로부터 user값을 받아온다
    const unsubscribe = onAuthStateChanged(auth,async (user) => {
        setCurrentUser(user);
          if (user) {
            fetchUserInfo(user);
            console.log('고객정보있음')
          } else {

            console.log('고객정보없음')
        }
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);*/
  useEffect(() => {
    console.log('두배')
    fetchUserInfo_mongo(currentUser);
    setIsLoading(false);
  }, []);
  // 이벤트 : 사용자 인증 상태 감지(onAuthStateChanged함수) → 구독해제 (해제안할시 계속 사용자 인증 상태 감지가 작동해서 메모리 낭비)
  // → 그러면 사용자 인증 값 (ex) 세션)이 바뀌면 어떻게 감지할까 → []가 비어있음에도 onAuthStateChanged함수 기본 기능 중 하나인 사용자 인증 관련 변화를 감지가 작동되서 그때 useeffect 작동
  // → 결론적으로 unsubscribe(); 가 아닌 return () => unsubscribe(); 를 쓴 이유가 된다.


  useEffect(() => {
    const calculateExp1rm = () => {
      // Baenchle Formula 적용 
      const newExp1rm = parseFloat((BenchPressWeight * (1 + 0.0333 * BenchPressTimes)).toFixed(3));
      setexp1rm(newExp1rm);
    };
    calculateExp1rm();
  }, [BenchPressWeight, BenchPressTimes]);

  useEffect(() => {
    const calculateSquatExp1rm = () => {
      const newSquatExp1rm = parseFloat((SquatWeight * (1 + 0.0333 * SquatTimes)).toFixed(3));
      setSquatExp1(newSquatExp1rm);
    };
    calculateSquatExp1rm();
  }, [SquatWeight, SquatTimes]);

/* 새로고침시 로그아웃 안되게 시작 */
  const unloadHandler = (e) => {
    e.preventDefault();
};


  useEffect(() => {
  // beforeunload : 페이지이탈(or 새로고침)시 이벤트

  window.addEventListener('beforeunload', unloadHandler);
  return () => {
  window.removeEventListener('beforeunload', unloadHandler);
  };
  }, []);
/* 새로고침 또는 페이지이탈시에만 unloadHandler라는 이벤트가 발생되고 unloadHandler작업후 remove로 퇴장 (for 메모리 누수 방지)*/
/* 새로고침시 로그아웃 안되게 끝 */


  /* 고객정보 가져오기 */
  const fetchUserInfo = async (user) => {
    console.log('user')
    console.log(user)
    const firestore = getFirestore();
    const customerDocRef = doc(firestore, 'customer', user.uid);
    const customerDoc = await getDoc(customerDocRef);

    if (customerDoc.exists()) {
      const userInfo = customerDoc.data();
      setName(userInfo.이름);
      setGender(userInfo.성별);
      setAge(userInfo.나이);
      setHeight(userInfo.신장);
      setWeight(userInfo.체중);
      setBenchPressWeight(userInfo.벤치프레스중량);
      setBenchPressTimes(userInfo.벤치프레스횟수);
      setSquatWeight(userInfo.스쿼트중량);
      setSquatTimes(userInfo.스쿼트횟수);

      const storage = getStorage();
      const imagePath = `images/${user.uid}`;
      const imageRef = ref(storage, imagePath);
      
      try {
        const imageURL = await getDownloadURL(imageRef);
        setPhotoURL(imageURL);
        console.log("a2")
        console.log(imageURL)
      } catch (error) {
        console.log('이미지를 가져오는데 실패하였습니다.', error);
        setPhotoURL(anany); 
      }
    } else {
      console.log('No such document!');
    }
  };

  const fetchUserInfo_mongo = async (user) => {
    console.log('현재 user 정보 : ', user)
    if(user){
      setName(user.name);
      setGender(user.gender);
    }
  /*  if (customerDoc.exists()) {
      const userInfo = customerDoc.data();
      setName(userInfo.이름);
      setGender(userInfo.성별);
      setAge(userInfo.나이);
      setHeight(userInfo.신장);
      setWeight(userInfo.체중);
      setBenchPressWeight(userInfo.벤치프레스중량);
      setBenchPressTimes(userInfo.벤치프레스횟수);
      setSquatWeight(userInfo.스쿼트중량);
      setSquatTimes(userInfo.스쿼트횟수);

      const storage = getStorage();
      const imagePath = `images/${user.uid}`;
      const imageRef = ref(storage, imagePath);
      
      try {
        const imageURL = await getDownloadURL(imageRef);
        setPhotoURL(imageURL);
        console.log("a2")
        console.log(imageURL)
      } catch (error) {
        console.log('이미지를 가져오는데 실패하였습니다.', error);
        setPhotoURL(anany); 
      }
    } else {
      console.log('No such document!');
    }*/
  };



  const handleSubmitHeight = () => {
    handleSubmitField("신장", newHeight, setHeight, setIsEditingHeight);
  };
  
  const handleSubmitBenchPressWeight = () => {
    handleSubmitField("벤치프레스중량", newBenchPressWeight, setBenchPressWeight, setIsEditingBenchPressWeight);
  };
  const handleSubmitSquatWeight = () => {
    handleSubmitField("스쿼트중량", newSquatWeight, setSquatWeight, setIsEditingSquatWeight);
  };

  const handleSubmitBenchPressTimes = () => {
    handleSubmitField("벤치프레스횟수", newBenchPressTimes, setBenchPressTimes, setIsEditingBenchPressTimes);
  };
  const handleSubmitSquatTimes = () => {
    handleSubmitField("스쿼트횟수", newSquatTimes, setSquatTimes, setIsEditingSquatTimes);
  };

  const displayContent = () => {
    switch (selectedItem) {
      case 'item-0':
        return (
         <div >
          <Item1NonCustomer/ >
         </div> )

      case 'item-1':
        return (
        <div >
        {currentUser ? (
          <Item1Customer
                          name={name} 
                          gender={gender} 
                          age={age} 
                          height={height} 
                          weight={weight} 
                          isEditingHeight={isEditingHeight} 
                          newHeight={newHeight} 
                          setIsEditingHeight={setIsEditingHeight} 
                          handleSubmitHeight={handleSubmitHeight} 
                          setNewHeight = {setNewHeight}
                        />
                    ) : (
                    <Item1NonCustomer/ >
                    )}
      </div> )

      case 'item-1-1':
        return (
          <div>
        {currentUser ? (
          <Item11Customer
          isEditingBenchPressWeight={isEditingBenchPressWeight}
          BenchPressWeight={BenchPressWeight}
          newBenchPressWeight={newBenchPressWeight}
          setIsEditingBenchPressWeight={setIsEditingBenchPressWeight}
          handleSubmitBenchPressWeight={handleSubmitBenchPressWeight}
          isEditingBenchPressTimes={isEditingBenchPressTimes}
          BenchPressTimes={BenchPressTimes}
          newBenchPressTimes={newBenchPressTimes}
          setIsEditingBenchPressTimes={setIsEditingBenchPressTimes}
          handleSubmitBenchPressTimes={handleSubmitBenchPressTimes}
          setNewBenchPressTimes = {setNewBenchPressTimes}
          setNewBenchPressWeight = {setNewBenchPressWeight}
          exp1rm={exp1rm}

           // 스쿼트 관련 프롭
          isEditingSquatWeight={isEditingSquatWeight}
          SquatWeight={SquatWeight}
          newSquatWeight={newSquatWeight}
          isEditingSquatTimes={isEditingSquatTimes}
          newSquatTimes={newSquatTimes}
          setIsEditingSquatWeight={setIsEditingSquatWeight}
          setIsEditingSquatTimes={setIsEditingSquatTimes}
          handleSubmitSquatWeight={handleSubmitSquatWeight}
          handleSubmitSquatTimes={handleSubmitSquatTimes}
          SquatTimes={SquatTimes}
          squatExp1rm={squatExp1rm}
          setNewSquatWeight={setNewSquatWeight}
          setNewSquatTimes={setNewSquatTimes}
                        />
                    ) : (
          <Item11NonCustomer/>
                    )}
      </div>
        );

      case 'item-1-2':
        return (
          <div className="item">
          <h4>폰트정리</h4>
          {/* <Item12Customer/> */}
          {/* <ProfileChange/> */}
          </div>
        );
      
      case 'item-1-3' :
        return(
          <div>
          <Inquiry/>
          </div>
        );
        
      case 'item-1-4' :
        return(
          <Question
          currentUser={currentUser} 
          authorName={name}/>
        );
      
      case 'item-1-5' :
        return(
          <div >
          <Servertest/>
          </div>
        );

      default:
        return <h4>아직 선택된 항목이 없습니다.</h4>;
    }
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="font6">
      <div style={{position:'fixed' , width: '100%', zIndex: 1}}> 
        <Navbar
            windowWidth = {windowWidth}
            setSelectedItem = {setSelectedItem}
          />
      </div>

      <div className="row">
        <Col2
          name={name} 
          photoURL={photoURL}
          currentUser={currentUser}
          navigate={navigate}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          handleLogout={handleLogout}
          setPhotoURL = {setPhotoURL}
          setColWidth = {setColWidth}
          setLeftMargin = {setLeftMargin}
        />
      </div>
{/* display:flex로하면 부모영역(red)안에 자식영역(pink)만큼만 표시 , display 명시 안할시 기본값 static */}
{/* margin기본설정 : 위 오른쪽 아래 왼쪽 , 문자로 style 지정시 '' 을쓰고 변수로 style지정시 ``를 써야한다. */}
      <div  style={{ width: colWidth ,margin : `122px 0 0 ${leftMargin}`,flexDirection: 'column', alignItems: 'center'}}> 
          {displayContent()}
      </div>
    </div>
  );
}

export default CustomerPage;
