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

function Question({ currentUser }) {
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
// ▼ 수정 및 저장 기능을 위한 상태값
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  
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

  const handleBackClick = () => {
    setSelectedPost(null);
    console.log('뒤로가기')
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // const handleAddPost = async (title, content) => {
  //  /* doc(firestore, 'collection1', 'document1')
  //   collection(firestore, 'collection1') */
  //   const firestore = getFirestore();
  //   const noti_question_testRef = collection(firestore, "noti_quetion_test");

  //   var a=await addDoc(noti_question_testRef, {
  //     uid: currentUserUid,
  //     name: authorName.authorName,
  //     timestamp: Timestamp.fromDate(new Date()),
  //     title: title,
  //     count : 0,
  //     grade: 0,
  //   })

  //   const noti_question_re_testRef = doc(firestore, "noti_question_re_test",a.id);

  //    await updateDoc(doc(firestore, "noti_quetion_test", a.id), {
  //     aid: a.id
  //   });

  //   await setDoc(noti_question_re_testRef, {
  //     content: content
  //   });
    
  //   handleClose();
  // };

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
    //여기부터
    var uid=''
    if(currentUser.platform){
      if(currentUser.platform=='naver'){
        uid=currentUser.id
      }
    }else{
      uid=currentUser._id
    }
    //여기까지
    fetch('/addq', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        qtitle: title,
        qcontent: content,
        writer: currentUser.name,
        created: createdtime,
        uid: uid//여긴 추가로
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
    if(currentUser == null) { // currentUser가 null인 경우에 대한 조건문을 추가
      console.log('로그인이 필요합니다');
  } else {
    if(post.uid === currentUser.id) {//이거 의미없는게 그냥 코드 살짝 바꾸면 아무나 접근가능한데 아 보안때매? ㅇㅇ
      // 네이버uid가 있으면서 게시글uid와 일치하는경우
          settitleOpen(true);
          setSelectedPost(post);
          console.log('상자열림');
        } else if(post.uid === currentUser._id) {
      // 네이버uid가 없으면서 게시글uid와 웹uid가 일치하는경우
          settitleOpen(true);
          setSelectedPost(post);
          console.log('상자열림');
        } else {
          console.log('권한이 없습니다.');
        }
      }
    // settitleOpen(true);
    // setSelectedPost(post);
    // console.log(selectedPost)
    // console.log('상자열림')
    // console.log('게시글 uid 값 확인', post.uid)
    // // ▲ 상태값 콜백 변환문제때문에 currentuser가 아닌 post로 uid를 받음
    // console.log('게시글 접근자 uid 네이버', currentUser.id )
    // console.log('게시글 접근자 uid 일반', currentUser._id )
 
    // if (currentUserUid === null) {
    //   alert("비회원은 사용할 수 없습니다.");
    // } else if (currentUserUid === post.uid)이거 {
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

  // ▼ 몽고db 수정하기 
  // POST : 새로운 생성 || PATCH : 수정
  const handleSave = async () => {
    //var uid=''
    // if(currentUser.platform){
    //   if(currentUser.platform=='naver'){
    //     uid=currentUser.id
    //   }
    // }else{
    //   uid=currentUser._id
    // }

    try {
      const response = await fetch(`/api/questions/${selectedPost._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qcontent: editedContent })
      });
  
      if (response) {
        const updatedPost = await response.json();
        setSelectedPost(updatedPost);
        setIsEditing(false);
        console.log('mongodb edited', response);
      } else {
        console.error('Failed to save the post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (  
    <div className="board_wrap font5" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10% 0 0 0'}}>
      <div className="board_title" style={{width:'70%'}}>
        <h2 className="font6" style={{ fontSize: '36px' }}>
          문의사항
        </h2>
        <h2 style={{ marginTop: '5px', fontSize: '24px' }}>문의사항을 빠르고 정확하게 안내해드립니다.</h2>
      </div>
      {selectedPost ? ( // 선택된 게시글이 있으면 선택된 게시글의 내용을 출력합니다.
        <div className="board" style={{ width: '70%' }}>
          <h2>{selectedPost.qtitle}</h2>
        <hr style={{ border: '2px solid #555' }} />
        {isEditing ? (
          <div>
            <TextField 
              value={editedContent} 
              onChange={e => setEditedContent(e.target.value)} 
            />
            <div>
              <Button onClick={handleSave}>저장</Button>
              <Button onClick={() => setIsEditing(false)}>취소</Button>
              <Button onClick={handleBackClick}>뒤로가기</Button>
            </div>
          </div>
        ) : (
          <div>
            <h3>{selectedPost.qcontent}</h3>
            <Button onClick={() => {
              setIsEditing(true);
              setEditedContent(selectedPost.qcontent);
            }}>수정</Button>
            <Button onClick={handleBackClick}>뒤로가기</Button>
          </div>
        )}

        </div>
      ) : (
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
              value={state.qtitle||""}
              onChange={handleChange}
              type="text" fullWidth />

            <TextField margin="dense" 
              label="내용"
              name="qcontent" 
              value={state.qcontent||""}
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

        {/* {selectedPost && (
          <Dialog open={titleopen} onClose={handleClose}>
            <DialogTitle>여기는 제목</DialogTitle>
            <DialogContent>
              <h2>{selectedPost.qcontent}</h2>
            </DialogContent>
            <Button onClick={handleClose}>취소</Button>
          </Dialog>
        )} */}

      </div>)} 
      {/* className="board" div 종료*/}

    </div>
  );
}

export default Question;
