import React, { useState, useEffect } from 'react';
import '../Inquiry.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { getFirestore, collection, query, doc, setDoc,addDoc, getDoc ,getDocs,where,orderBy,limit,Timestamp, updateDoc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { filledInputClasses } from '@mui/material';

function Question({ currentUser, authorName }) {
  const [titleopen, settitleOpen] = useState(false);
  const [postopen, setpostOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPostContent, setSelectedPostContent] = useState(null);
  const [currentUserUid, setCurrentUserUid] = useState(null);
  const [testing, settesting] = useState(false);
  const [qtitle, setQtitle] = useState("");
  const [qcontent, setQcontent] = useState("");
  const [state, setState] = useState("");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/questions');
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    };
  
    fetchQuestions();
  }, []);

  const handlepostOpen = () => {
    setpostOpen(true);
  };

  const handleClose = () => {
    setpostOpen(false);
    settitleOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddPost = async (title, content) => {
   /* doc(firestore, 'collection1', 'document1')
    collection(firestore, 'collection1') */
    const firestore = getFirestore();
    const noti_question_testRef = collection(firestore, "noti_quetion_test");

    var a=await addDoc(noti_question_testRef, {
      uid: currentUserUid,
      name: authorName.authorName,
      timestamp: Timestamp.fromDate(new Date()),
      title: title,
      count : 0,
      grade: 0,
    })

    const noti_question_re_testRef = doc(firestore, "noti_question_re_test",a.id);

     await updateDoc(doc(firestore, "noti_quetion_test", a.id), {
      aid: a.id
    });

    await setDoc(noti_question_re_testRef, {
      content: content
    });
    
    handleClose();
  };

  const createdtime = new Date().getTime();
  const mydate = new Date(createdtime);
  const monthNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  
  // 년, 월, 일, 시, 분 추출
  const year = mydate.getFullYear();
  const month = monthNames[mydate.getMonth()];
  const date = mydate.getDate(); // 이 부분을 수정했습니다.
  const hours = mydate.getHours();
  const minutes = mydate.getMinutes();
  
  // 출력 형식에 맞게 문자열 생성
  const dateString = `${year}년 ${month}월 ${date}일 ${hours}시 ${minutes}분`;
  console.log(dateString);

  const handleAddPost_mongo = async (title, content) => {
    fetch('/addq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        qtitle: title,
        qcontent: content,
        writer: currentUser ? currentUser.name : '익명',
        created: createdtime
      })
    })
    .then(response => response.json())
    .then(data => {
      console.log(`Response from server: ${JSON.stringify(data)}`);
      
      handleClose();
    })
    .catch(error => {
      console.error('Error:', error);
    });
};

  const handleTitleClick = async (post) => {
    settitleOpen(true);
    setSelectedPost(post);
    console.log('상자열림')
    // if (currentUserUid === null) {
    //   alert("비회원은 사용할 수 없습니다.");
    // } else if (currentUserUid === post.uid) {
    //   setSelectedPost(post);
    //   settitleOpen(true);
    // } else {
    //   alert("작성자와 일치하지 않습니다.");
    // }
  };


  /* 현재 사용자의 user.uid 설정 */
  useEffect(() => {
  const auth = getAuth();

  if (auth.currentUser) {
    setCurrentUserUid(auth.currentUser.uid);
  }
  }, []);

  // useEffect(() => {
  //   const getData = async () => {
  //     const firestore = getFirestore();
  //     const col = collection(firestore, "noti_quetion_test");
  //   };
  //     getData();
  //     settesting(false)
  // }, [testing]);
  
  // []안에 요소가 변경될 때마다 실행, []안이 공란이면 한 번만 실행

  return (  
    <div className="board_wrap font5" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10% 0 0 0'}}>
      <div className="board_title" style={{width:'70%'}}>
        <h2 className="font6" style={{ fontSize: '36px' }}>
          문의사항
        </h2>
        <h2 style={{ marginTop: '5px', fontSize: '24px' }}>문의사항을 빠르고 정확하게 안내해드립니다.</h2>
      </div>
      <div className="board" style={{width:'70%'}}>
        <div className="top">
          <div className="num"  >번호</div>
          <div className="title"  >제목</div>
          <div className="writer" style={{width:'17.5%'}} >글쓴이</div>
          <div className="date" style={{width:'17.5%'}} > 등록일 </div>
        </div>
        <div className="content">
          {/* index만큼 post로 배열을 구분한다. 즉 배열 하나하나를 post로 나눈다. */}
          {questions.map((post, index) => (
            // const createdtime = new Date(post.created).getTime();
            // const mydate = new Date(createdtime);
            // const monthNames = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
            
            // // 년, 월, 일, 시, 분 추출
            // const year = mydate.getFullYear();
            // const month = monthNames[mydate.getMonth()];
            // const date = mydate.getDate();
            // const hours = mydate.getHours();
            // const minutes = mydate.getMinutes();
            
            // // 출력 형식에 맞게 문자열 생성
            // const dateString = `${year}년 ${month}월 ${date}일 ${hours}시 ${minutes}분`;

           <div key={index} className="list">
            <div className="num">{index + 1}</div>
            <div className="title" onClick={() => handleTitleClick(post)}>{post.qtitle}</div>
            <div className="writer" style={{width:'17.5%'}} >{post.writer}</div>
            <div className="date" style={{width:'17.5%'}}>{post.created}</div>
          </div>
          ))}
        </div>
        <div className="upload-button">
        {currentUser ? (
          <Button
            href="#"
            style={{
              background: '#242D34',
              color: '#E0E0E0',
              fontFamily: '노토5',
              fontSize: '1.2rem',
              width: '102px',
              height: '40px',
              borderRadius: '5%',
            }}
            onClick={handlepostOpen}
          >
            등록
          </Button>
) : (
<div>&nbsp;</div>
)}
        </div>
        <Dialog open={postopen} onClose={handleClose}>
          <DialogTitle>새로운 게시물</DialogTitle>
          <DialogContent>
            <DialogContentText>제목, 글쓴이, 내용을 입력하세요</DialogContentText>
            <TextField autoFocus margin="dense" 
              label="제목"
              name="qtitle" 
              value={state.qtitle}
              onChange={handleChange}
              type="text" fullWidth />

            <TextField margin="dense" 
              label="내용"
              name="qcontent" 
              value={state.qcontent}
              onChange={handleChange}
              type="text" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
            <Button
              onClick={(event) => {
                event.preventDefault();
                handleAddPost_mongo(state.qtitle, state.qcontent);
              }}
            >
              확인
            </Button>
          </DialogActions>
        </Dialog>

        {selectedPost && (
          <Dialog open={titleopen} onClose={handleClose}>
            <DialogTitle>여기는 제목</DialogTitle>
            <DialogContent>
              <h2>{selectedPost.qcontent}</h2>
            </DialogContent>
            <Button onClick={handleClose}>취소</Button>
          </Dialog>
        )}
      </div>
    </div>
  );
}

export default Question;
