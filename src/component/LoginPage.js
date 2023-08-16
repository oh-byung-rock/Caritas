import React, { useState } from 'react';
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
const api =require('../server/api.js')

function LoginPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fileName, setFileName] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [imagepoket, setImagePoket] = useState(null);

  const getDefaultImageUrl = async () => {
    const storage = getStorage();
    const imageRef = ref(storage, 'anany2.png');
    const url = await getDownloadURL(imageRef);
    return url;
  }  

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

  // 로그인 기능 (서버용)
  // const handleLogin = async () => {
  //   const auth = getAuth();
  //     signInWithEmailAndPassword(auth, email, password)
  //       .then(async (userCredential) => {
  //          const userdata= await api.login(userCredential.user.uid)
  //          console.log(userdata);
  //          if(userdata.code==0){
  //           alert("Thanks for coming!");
  //           handleClose();
  //           navigate("/customer");
  //          }else{
  //           alert("실패 "+userdata.code);
  //          }
  //       })
  //       .catch((error) => {
  //         alert("로그인 정보를 확인해주세요");
  //       });
  // };
  // 로그인 기능 (일반용)
  const handleLogin = async () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // 회원 정보가 있는 경우
        alert("Thanks for coming!");
        handleClose();
        navigate("/customer");
      })
      .catch((error) => {
        // 로그인 정보가 잘못된 경우
        alert("로그인 정보를 확인해주세요");
      });
  };
  
  // 회원가입 기능
  const handleSignUp = async () => {
    if (!fileName) {
      const isDefaultImageConfirmed = window.confirm(
        "프로필 이미지가 선택되지 않았습니다. 기본 이미지로 지정하시겠습니까?"
      );
  
      if (!isDefaultImageConfirmed) {
        alert("프로필 이미지를 선택해주세요.");
        return;
      }
    }
  
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // 입력 데이터 검증
        if (name && gender && age && weight && height) {
          // 회원 가입 성공
          const user = userCredential.user;
          
        if (fileName) { 
          const storage = getStorage();
          // 코드 변경: 이미지 파일 이름을 user.uid로 구분하여 저장합니다.
          const imageRef = ref(storage, `images/${user.uid}`);
          await uploadBytes(imageRef, imagepoket);
        }
          const firestore = getFirestore();
          const customerDocRef = doc(firestore, 'customer', userCredential.user.uid);
  
          const parsedAge = parseInt(age);
          const parsedWeight = parseInt(weight);
          const parsedHeight = parseInt(height);
  
          await setDoc(customerDocRef, {
            이름: name,
            성별: gender,
            나이: parsedAge,
            체중: parsedWeight,
            신장: parsedHeight
          });
          alert("회원 가입 성공");
          resetFields();
          handleClose();
        } else {
          alert("모든 필드를 입력해주세요.");
        }
      })
      .catch((error) => {
        alert(error);
        console.log(error.code);
        console.log(error.message);
      });
  };
  
  

  return (
    <div className="background">
    {/* <div className="login-container"> */}
    <div className="form-container font5">
    <img src={logo} style={{ marginTop: '-50px' }} width="180" height="90" />
    <input
      className="item"
      type="text"
      placeholder="아이디"
      value={email}
      onChange={(e) => setEmail(e.target.value)} />

    <input
      className="item"
      type="password"
      placeholder="비밀번호"
      value={password}
      onChange={(e) => setPassword(e.target.value)} />
    <div>
    <Button 
      className="item2"
      type="button"
      variant="contained"
      style={{ fontFamily: "노토5" , fontSize: 16, backgroundColor: '#F5782A'}}
      onClick={handleLogin}> 로그인 
    </Button>
    </div>
    <Button
      className="item3"
      type="button"
      style={{ color: "#242D34" , fontFamily: "노토5" }}
      onClick={handleClickOpen}
      > 회원가입
    </Button>
    </div>

        <Dialog open={open} onClose={handleClose} className="dialog-overlay">
        <DialogTitle><img src={logo} style={{ marginLeft: '30px' }} width="180" height="90" /></DialogTitle>
        <DialogContent className="dialog" >
        
        <FormControl>
        <Input
         id="file-input"
         type="file"
         accept="image/*"
         onChange={handleFileChange}
         aria-describedby="file-input-helper" />
        <FormHelperText id="file-input-helper" style={{ fontFamily: "노토5", marginBottom:'10px'}}>이미지 파일만 업로드할 수 있습니다.</FormHelperText>
        </FormControl>

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
        <Button style={{ color: "#242D34" , fontFamily: "노토5", marginBottom:'10px'}} onClick={handleSignUp}>가입하기</Button>
        <Button style={{ color: "#242D34" , fontFamily: "노토5",marginBottom:'20px' }} type="button" onClick={handleClose}> 닫기 </Button>
      </Dialog>
    </div>
  );
}

export default LoginPage;
