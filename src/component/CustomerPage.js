
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
import Paging from './Paging';
// ▼ GradeContext 준비물1
import { GradeContext } from '../App';
import React, { useContext, useState, useEffect } from 'react';

function CustomerPage({ currentUser, setCurrentUser }) {
  
  const [selectedItem, setSelectedItem] = useState('item-0');
  const [name, setName] = useState('이름없음');
  const [photoURL, setPhotoURL] = useState(anany);

  const [gender, setGender] = useState('성별');
  const [age, setAge] = useState('나이');
  const [height, setHeight] = useState('1');
  const [weight, setWeight] = useState('1');
  const [checkedheight, setCheckedheight] = useState('1');
  const [checkedweight, setCheckedweight] = useState('2');

  // height 와 weight 편집모드
  const [isEditingHeight, setIsEditingHeight] = useState(false);
  const [isEditingWeight, setIsEditingWeight] = useState(false);
  // 변경된 height 와 weight 
  const [newHeight, setNewHeight] = useState('');
  const [newWeight, setNewWeight] = useState('');
  // ▼ 벤치프레스 1RM 관련 isEdit
  const [isEditingBenchPressWeight, setIsEditingBenchPressWeight] = useState(false);
  const [isEditingBenchPressTimes, setIsEditingBenchPressTimes] = useState(false);
  const [isEditingBenchPressreal1rm, setIsEditingBenchPressreal1rm] = useState(false);

  const [BenchPressWeight, setBenchPressWeight] = useState("0");
  const [BenchPressTimes, setBenchPressTimes] = useState("0");

  const [newBenchPressWeight, setNewBenchPressWeight] = useState(BenchPressWeight);
  const [newBenchPressTimes, setNewBenchPressTimes] = useState(BenchPressTimes);
  const [newBenchPressreal1rm, setNewBenchPressreal1rm] = useState(BenchPressTimes);
  
  const [exp1rm, setexp1rm] = useState(0);

  // ▼ 스쿼트 1RM 중량,횟수 초기값
  const [SquatWeight, setSquatWeight] = useState("0");
  const [SquatTimes, setSquatTimes] = useState("0");
  // ▼ 스쿼트 1RM 관련 isEdit
  const [isEditingSquatWeight, setIsEditingSquatWeight] = useState(false);
  const [isEditingSquatTimes, setIsEditingSquatTimes] = useState(false);
  // ▼ 스쿼트 1RM 관련 value
  const [newSquatWeight, setNewSquatWeight] = useState(SquatWeight);
  const [newSquatTimes, setNewSquatTimes] = useState(SquatTimes);
  const [squatExp1rm, setSquatExp1] = useState(0);

  // ▼ 데드 1RM 중량,횟수 초기값
  const [DeadWeight, setDeadWeight] = useState("0");
  const [DeadTimes, setDeadTimes] = useState("0");
  // ▼ 데드 1RM 관련 isEdit
  const [isEditingDeadWeight, setIsEditingDeadWeight] = useState(false);
  const [isEditingDeadTimes, setIsEditingDeadTimes] = useState(false);
  // ▼ 데드 1RM 관련 value
  const [newDeadWeight, setNewDeadWeight] = useState(DeadWeight);
  const [newDeadTimes, setNewDeadTimes] = useState(DeadTimes);

  // 반응형 메뉴바 상태변수
  const [showSidebar, setShowSidebar] = useState(false); 
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // col2 반응형 상태변수
  const [colWidth, setColWidth] = useState('85%');
  const [leftMargin, setLeftMargin] = useState('15%');

  const navigate = useNavigate();

  // const handleSubmitField = async (field, value, setOriginalValue, setIsEditing) => {
  //   const auth = getAuth();
  //   const user = auth.currentUser;
  
  //   if (user) {
  //     try {
  //       const firestore = getFirestore();
  //       const customerDocRef = doc(firestore, "customer", user.uid);
  
  //       await updateDoc(customerDocRef, {
  //         [field]: value,
  //       });

  //       setOriginalValue(value);
  //       setIsEditing(false);
  //     } catch (error) {
  //       console.log(`${field} 업데이트에 실패하였습니다.`, error);
  //     }
  //   }
  // };
  
  

  const handleLogout = async () => {
    try {
      // 로그아웃 세트
      const auth = getAuth();
      await signOut(auth);
      // 로그아웃 세트
      window.sessionStorage.setItem("currentUser",null);
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
    // window.addEventListener('beforeunload', handleLogout);
    // return () => {
    //     window.removeEventListener('beforeunload', handleLogout);
    // };
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
    console.log('두배', currentUser)
    fetchUserInfo_mongo(currentUser);
    setIsLoading(false);
  }, [currentUser]);
  // 이벤트 : 사용자 인증 상태 감지(onAuthStateChanged함수) → 구독해제 (해제안할시 계속 사용자 인증 상태 감지가 작동해서 메모리 낭비)
  // → 그러면 사용자 인증 값 (ex) 세션)이 바뀌면 어떻게 감지할까 → []가 비어있음에도 onAuthStateChanged함수 기본 기능 중 하나인 사용자 인증 관련 변화를 감지가 작동되서 그때 useeffect 작동
  // → 결론적으로 unsubscribe(); 가 아닌 return () => unsubscribe(); 를 쓴 이유가 된다.

  useEffect(() => {
    const fetchF5 = async () => {
      let uid = '';
      if(currentUser){
        if (currentUser.platform) {
          if (currentUser.platform == 'naver') {
            uid = currentUser.id;
          }
        } else {
          uid = currentUser._id;
        }
      } else { 
        console.log('거울임'); 
      }
  
      try {
        const response = await fetch(`/checkinfo/${uid}`);
        if (!response.ok) {
          throw new Error('서버 응답 오류');
        }
        const data = await response.json();
        const { checkedweight, checkedheight } = data;
        setCheckedweight(checkedweight);
        setCheckedheight(checkedheight);
        setPublicBodyweight(checkedweight);
        console.log('weight:', checkedweight, 'height:', checkedheight);
      } catch (error) {
        console.error('사용자 정보를 가져오는데 실패했습니다:', error);
      }
    };
  
    fetchF5();  // 사용자 정보를 갱신합니다.
  }, [currentUser,checkedheight,checkedweight]);
  
  

  // useEffect(() => {
  //   const calculateExp1rm = () => {
  //     // Baenchle Formula 적용 
  //     const newExp1rm = parseFloat((BenchPressWeight * (1 + 0.0333 * BenchPressTimes)).toFixed(3));
  //     setexp1rm(newExp1rm);
  //   };
  //   calculateExp1rm();
  // }, [BenchPressWeight, BenchPressTimes]);

  // useEffect(() => {
  //   const calculateSquatExp1rm = () => {
  //     const newSquatExp1rm = parseFloat((SquatWeight * (1 + 0.0333 * SquatTimes)).toFixed(3));
  //     setSquatExp1(newSquatExp1rm);
  //   };
  //   calculateSquatExp1rm();
  // }, [SquatWeight, SquatTimes]);

/* 새로고침시 로그아웃 안되게 시작 */
  const unloadHandler = (e) => {
    //e.preventDefault();
    //e.returnValue = '';
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
  // const fetchUserInfo = async (user) => {
  //   console.log('user')
  //   console.log(user)
  //   const firestore = getFirestore();
  //   const customerDocRef = doc(firestore, 'customer', user.uid);
  //   const customerDoc = await getDoc(customerDocRef);

  //   if (customerDoc.exists()) {
  //     const userInfo = customerDoc.data();
  //     setName(userInfo.이름);
  //     setGender(userInfo.성별);
  //     setAge(userInfo.나이);
  //     setHeight(userInfo.신장);
  //     setWeight(userInfo.체중);
  //     setBenchPressWeight(userInfo.벤치프레스중량);
  //     setBenchPressTimes(userInfo.벤치프레스횟수);
  //     setSquatWeight(userInfo.스쿼트중량);
  //     setSquatTimes(userInfo.스쿼트횟수);

  //     const storage = getStorage();
  //     const imagePath = `images/${user.uid}`;
  //     const imageRef = ref(storage, imagePath);
      
  //     try {
  //       const imageURL = await getDownloadURL(imageRef);
  //       setPhotoURL(imageURL);
  //       console.log("a2")
  //       console.log(imageURL)
  //     } catch (error) {
  //       console.log('이미지를 가져오는데 실패하였습니다.', error);
  //       setPhotoURL(anany); 
  //     }
  //   } else {
  //     console.log('No such document!');
  //   }
  // };

  const fetchUserInfo_mongo = async (user) => {
    console.log('현재 일반로그인 user 정보 : ', user)
    if(user){
      setName(user.name);
      setGender(user.gender);
      setAge(user.age);

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

  const benchpressCoefficients = [1, 1.035, 1.08, 1.115, 1.15, 1.18, 1.22, 1.255, 1.29, 1.325];
  const squatCoefficients = [1, 1.0475, 1.13, 1.1575, 1.2, 1.242, 1.284, 1.326, 1.368, 1.41];
  const deadCoefficients = [1, 1.065, 1.13, 1.147, 1.164, 1.181, 1.198, 1.22, 1.232, 1.24];
  
  const { setPublicIndirectweight } = useContext(GradeContext);
  const indirectbench = (platform, bpct, bpwt) => {
    let multiplier;
    
    if (platform === '벤치') {
      multiplier = benchpressCoefficients[bpct - 1];
    } else if (platform === '스쿼트') {
      multiplier = squatCoefficients[bpct - 1];
    } else if (platform === '데드'){
      multiplier = deadCoefficients[bpct - 1];
    }
  
    const indirectresult = bpwt * multiplier;
    setPublicIndirectweight(indirectresult);
    return indirectresult;
  }
  
  // ▼ GradeContext 준비물2
    const { publicAge, setPublicAge, publicGender, setPublicGender, publicBodyweight , setPublicBodyweight } = useContext(GradeContext);

    const createdtime = new Date().getTime();
    const mydate = new Date(createdtime);
    const year = mydate.getFullYear();

    useEffect(() => {
      if(currentUser){
      if (currentUser.platform && currentUser.platform === 'naver') {
        setPublicAge(year - currentUser.birthyear);
        setPublicGender(currentUser.gender === 'F' ? '여성' : '남성');
      } else {
        setPublicAge(currentUser.age);
        setPublicGender(currentUser.gender);
      }
      }else{
        console.log('가다')
      }
      console.log('createcontext');
    }, [currentUser]);
  // ▲ React.createContext()  

  // const handleSubmitHeight = () => {
  //   handleSubmitField("신장", newHeight, setHeight, setIsEditingHeight);
  // };
  
  // const handleSubmitBenchPressWeight = () => {
  //   handleSubmitField("벤치프레스중량", newBenchPressWeight, setBenchPressWeight, setIsEditingBenchPressWeight);
  // };

  // const handleSubmitSquatWeight = () => {
  //   handleSubmitField("스쿼트중량", newSquatWeight, setSquatWeight, setIsEditingSquatWeight);
  // };

  // const handleSubmitBenchPressTimes = () => {
  //   handleSubmitField("벤치프레스횟수", newBenchPressTimes, setBenchPressTimes, setIsEditingBenchPressTimes);
  // };
  // const handleSubmitSquatTimes = () => {
  //   handleSubmitField("스쿼트횟수", newSquatTimes, setSquatTimes, setIsEditingSquatTimes);
  // };

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
                          isEditingWeight={isEditingWeight}
                          newHeight={newHeight}
                          newWeight={newWeight}
                          setNewHeight = {setNewHeight}
                          setNewWeight = {setNewWeight}
                          setIsEditingHeight={setIsEditingHeight} 
                          setIsEditingWeight={setIsEditingWeight}
                          // handleSubmitHeight={handleSubmitHeight} 
                          currentUser={currentUser}
                          checkedheight={checkedheight}
                          checkedweight={checkedweight}
                          setCheckedheight={setCheckedheight}
                          setCheckedweight={setCheckedweight}
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
          currentUser = {currentUser}
          BenchPressWeight={BenchPressWeight}
          BenchPressTimes={BenchPressTimes}
          
          // handleSubmitBenchPressWeight={handleSubmitBenchPressWeight}
          isEditingBenchPressTimes={isEditingBenchPressTimes}
          isEditingBenchPressreal1rm={isEditingBenchPressreal1rm}
          isEditingBenchPressWeight={isEditingBenchPressWeight}
          setIsEditingBenchPressTimes={setIsEditingBenchPressTimes}
          setIsEditingBenchPressWeight={setIsEditingBenchPressWeight}
          setIsEditingBenchPressreal1rm={setIsEditingBenchPressreal1rm}
          // handleSubmitBenchPressTimes={handleSubmitBenchPressTimes}

          newBenchPressTimes={newBenchPressTimes}
          newBenchPressreal1rm={newBenchPressreal1rm}
          newBenchPressWeight={newBenchPressWeight}
          setNewBenchPressTimes = {setNewBenchPressTimes}
          setNewBenchPressWeight = {setNewBenchPressWeight}
          setNewBenchPressreal1rm={setNewBenchPressreal1rm}

          exp1rm={exp1rm}
          indirectbench = {indirectbench}
          // 스쿼트 1RM 무게, 횟수 edit
          SquatWeight={SquatWeight}
          SquatTimes={SquatTimes}
          isEditingSquatWeight = {isEditingSquatWeight}
          setIsEditingSquatWeight = {setIsEditingSquatWeight}
          newSquatWeight={newSquatWeight}
          setNewSquatWeight={setNewSquatWeight}
          newSquatTimes={newSquatTimes}
          setNewSquatTimes={setNewSquatTimes}

          isEditingSquatTimes = {isEditingSquatTimes}
          setIsEditingSquatTimes = {setIsEditingSquatTimes}
          // newSquatWeight={newSquatWeight}
          // isEditingSquatTimes={isEditingSquatTimes}
          // newSquatTimes={newSquatTimes}

          // setIsEditingSquatTimes={setIsEditingSquatTimes}
          // handleSubmitSquatWeight={handleSubmitSquatWeight}
          // handleSubmitSquatTimes={handleSubmitSquatTimes}
          // squatExp1rm={squatExp1rm}
          // setNewSquatWeight={setNewSquatWeight}
          // setNewSquatTimes={setNewSquatTimes}

          // 데드 1RM 무게, 횟수 edit
          DeadWeight={DeadWeight}
          DeadTimes={DeadTimes}
          isEditingDeadWeight = {isEditingDeadWeight}
          setIsEditingDeadWeight = {setIsEditingDeadWeight}
          isEditingDeadTimes = {isEditingDeadTimes}
          setIsEditingDeadTimes = {setIsEditingDeadTimes}
          newDeadWeight={newDeadWeight}
          setNewDeadWeight={setNewDeadWeight}
          newDeadTimes={newDeadTimes}
          setNewDeadTimes={setNewDeadTimes}
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
          // navigate('/question')
          <Question
          currentUser={currentUser}/>
        );
      
      case 'item-1-5' :
        return(
          <div >
          <Paging/>
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
