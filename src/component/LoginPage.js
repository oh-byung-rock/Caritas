import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import '../style.css';
import { app } from './FireBase.js';
import anany2 from '../assets/anany2.png'
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from 'firebase/auth';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import logo from '../assets/reallogo.png';

// const api =require('../server/api.js')

function LoginPage({ currentUser, setCurrentUser }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");;
  const [naverLogin, setNaverLogin] = useState(null);
  const [fileName, setFileName] = useState("");
  const [name, setName] = useState("testname");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [imagepoket, setImagePoket] = useState(null);
  const [state, setState] = useState("");

  // https://loy124.tistory.com/246

  // ▼ 로그인 성공시 처리
  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(state)
    })
    .then(response => response.json())
    .then(data => {
      console.log(`Data from server: ${JSON.stringify(data)}`);
      
      if (data.message === '로그인 성공!') {
        console.log('status 200');
        alert("Thanks for coming!");
        handleClose();
        setCurrentUser(data.user);
        console.log('이렇게 변함', data.user)
        navigate("/");
      } else {
        console.log('Login failed:', data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  useEffect(() => {
    console.log('currentUser has changed:', currentUser);
  }, [currentUser]);

  // ▼ 네이버 로그인 관련 
  useEffect(() => {
    const naverLoginObj = new window.naver.LoginWithNaverId({
      clientId: "8823YaHRIRRXCm6paIqu",
      clientSecret : "9zVonIUhEn",
      callbackUrl: "http://localhost:3000/login",
      isPopup: false,
      loginButton: {color: "green", type: 2, height: 45}
    });
    // ▼ 네이버 정보 초기화
    naverLoginObj.init();
    
    if(naverLoginObj.accessToken && naverLoginObj.accessToken.accessToken){
      console.log('클라 토큰',naverLoginObj.accessToken.accessToken);
      // 백엔드 서버를 통한 사용자 정보 요청
      fetch('http://localhost:3000/api/naver/userinfo', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${naverLoginObj.accessToken.accessToken}`
        }
      })
      .then(response => response.json())
      .then(responseData => {
        console.log('사용자 전체 정보',responseData);
        console.log('사용자 uid',responseData.response.id);
        console.log('사용자 이름',responseData.response.name);
        setCurrentUser(responseData.response);
 
      })
      .catch(error => {
        console.error('에러1',error);
      });
    navigate("/");  
    }
  
    setNaverLogin(naverLoginObj);
  }, []);

  const handleLogin = () => {
    if (naverLogin) {
      naverLogin.authorize();
    }
  };
  // ▼ 회원가입 관련 
  const handleSubmit2 = (event) => {
    event.preventDefault();
  
    // Create a new object to send all necessary data
    const dataToSend = {
      ...state,
      email,
      password,
      name,
      gender,
      age,
      weight,
      height
    };

    fetch('/add2', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    })
    .then(response => {
        if (response.status === 200) {
          console.log('status 200');
          return response.json();
        } else {
          console.log(response.status);
          return response.json();
        }
     })
     .then(data => {
       console.log(`Data from server: ${JSON.stringify(data)}`);
       console.log(`Data sent to server: ${JSON.stringify(dataToSend)}`); // Add this line to log the data you sent.
     })
     .catch(error => {
       console.error('Error:', error);
     });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
  if (selectedFile && selectedFile.type.startsWith("image/")) {
    setFileName(selectedFile.name);
    setImagePoket(selectedFile);
    } else {
      alert("이미지 파일만 선택해주세요");
      setFileName("");
      setImagePoket(null); // 파일 정보 초기화
    }
};

const resetFields = () => {
  setImagePoket(null);
  setEmail("");
  setPassword("");
  setName("");
  setHeight("");
  setWeight("");
  setAge("");
  setGender("");
};

  const handleClickOpen = () => {
    resetFields();
    setOpen(true);
  };

  const handleClose = () => {
    resetFields();
    setOpen(false);
  };
  
  // // 회원가입 기능
  // const handleSignUp = async () => {
  //   if (!fileName) {
  //     const isDefaultImageConfirmed = window.confirm(
  //       "프로필 이미지가 선택되지 않았습니다. 기본 이미지로 지정하시겠습니까?"
  //     );
  
  //     if (!isDefaultImageConfirmed) {
  //       alert("프로필 이미지를 선택해주세요.");
  //       return;
  //     }
  //   }
  
  //   const auth = getAuth();
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then(async (userCredential) => {
  //       // 입력 데이터 검증
  //       if (name && gender && age && weight && height) {
  //         // 회원 가입 성공
  //         const user = userCredential.user;
          
  //       if (fileName) { 
  //         const storage = getStorage();
  //         // 코드 변경: 이미지 파일 이름을 user.uid로 구분하여 저장합니다.
  //         const imageRef = ref(storage, `images/${user.uid}`);
  //         await uploadBytes(imageRef, imagepoket);
  //       }
  //         const firestore = getFirestore();
  //         const customerDocRef = doc(firestore, 'customer', userCredential.user.uid);
  
  //         const parsedAge = parseInt(age);
  //         const parsedWeight = parseInt(weight);
  //         const parsedHeight = parseInt(height);
  
  //         await setDoc(customerDocRef, {
  //           이름: name,
  //           성별: gender,
  //           나이: parsedAge,
  //           체중: parsedWeight,
  //           신장: parsedHeight
  //         });
  //         alert("회원 가입 성공");
  //         resetFields();
  //         handleClose();
  //       } else {
  //         alert("모든 필드를 입력해주세요.");
  //       }
  //     })
  //     .catch((error) => {
  //       alert(error);
  //       console.log(error.code);
  //       console.log(error.message);
  //     });
  // };
  
  return (
    <div className="background">
    {/* <div className="login-container"> */}
    <div className="form-container font5">
    <img src={logo} style={{ marginTop: '-50px' }} width="180" height="90" />
    <input
      className="item"
      type="text"
      placeholder="아이디"
      name="email" 
      value={state.email} 
      onChange={handleChange}
    />

    <input
      className="item"
      type="password"
      name="password" 
      placeholder="비밀번호"
      value={state.password} 
      onChange={handleChange}
    />
    <div>
    <Button 
      className="item2"
      type="button"
      variant="contained"
      style={{ fontFamily: "노토5" , fontSize: 16, backgroundColor: '#F5782A'}}
      onClick={handleSubmit}> 로그인 
    </Button>
    </div>
    <Button
      className="item3"
      type="button"
      style={{ color: "#242D34" , fontFamily: "노토5" }}
      onClick={handleClickOpen}
      > 회원가입
    </Button>
    <Button
      className="item2"
      type="button"
      id="naverIdLogin"
      style={{ color: "#242D34" , fontFamily: "노토5" , top:"50px" }}
      onClick={handleLogin}
      > </Button>

    </div>

        <Dialog open={open} onClose={handleClose} className="dialog-overlay">
        <DialogTitle><img src={logo} style={{ marginLeft: '30px' }} width="180" height="90" /></DialogTitle>
        <DialogContent className="dialog" >
        
        {/* <FormControl>
        <Input
         id="file-input"
         type="file"
         accept="image/*"
         onChange={handleFileChange}
         aria-describedby="file-input-helper" />
        <FormHelperText id="file-input-helper" style={{ fontFamily: "노토5", marginBottom:'10px'}}>이미지 파일만 업로드할 수 있습니다.</FormHelperText>
        </FormControl> */}

          <br/>
           <TextField
            label="아이디"
            type="text"
            name="id"
            style={{ fontFamily: "노토5", marginBottom:'10px'}}
            value={email}
            onChange={(e) => setEmail(e.target.value)} />
          <br/>
          <TextField
            label="비밀번호"
            type="password"
            name="password"
            style={{ fontFamily: "노토5", marginBottom:'10px'}}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* 이름 입력 칸 추가하기 */}
          <TextField
                label="이름"
                type="text"
                style={{ fontFamily: "노토5", marginBottom:'10px'}}
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <FormControl component="fieldset">
                <RadioGroup
                  row
                  value={gender}
                  style={{ fontFamily: "노토5", marginBottom:'10px'}}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <FormControlLabel
                    value="남자"
                    control={<Radio color="primary" />}
                    label="남자"
                  />
                  <FormControlLabel
                    value="여자"
                    control={<Radio color="primary" />}
                    label="여자"
                  />
                </RadioGroup>
              </FormControl>
              <br/>

            {/* 나이 입력 칸 추가하기 */}
            <TextField
              label="나이"
              type="text"
              value={age}
              style={{ fontFamily: "노토5", marginBottom:'10px'}}
              onChange={(e) => setAge(e.target.value)}
            />
            <br/>

            {/* 체중 입력 칸 추가하기 */}
            <TextField
              label="체중"
              type="text"
              style={{ fontFamily: "노토5", marginBottom:'10px'}}
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
            <br/>

            {/* 신장 입력 칸 추가하기 */}
            <TextField
              label="신장"
              type="text"
              value={height}
              style={{ fontFamily: "노토5", marginBottom:'10px'}}
              onChange={(e) => setHeight(e.target.value)}
            />
        </DialogContent>
        <Button style={{ color: "#242D34" , fontFamily: "노토5", marginBottom:'10px'}} onClick={handleSubmit2}>가입하기</Button>
        <Button style={{ color: "#242D34" , fontFamily: "노토5",marginBottom:'20px' }} type="button" onClick={handleClose}> 닫기 </Button>
      </Dialog>
    </div>
  );
}

export default LoginPage;
