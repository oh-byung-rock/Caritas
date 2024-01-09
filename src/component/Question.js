import React, { useState, useEffect,useContext } from 'react';
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
import { useNavigate } from 'react-router-dom';
import { error } from 'jquery';
import searchimg from '../assets/searchimg.png';
import noncheck from '../assets/noncheck.png';
import oncheck from '../assets/oncheck.png';
import Paging from './Paging';
import close from '../assets/close.png';
import quepage from '../assets/quepage.jpg';
import { GradeContext } from '../App';

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
// ▼ 검색창 상태값
  const [searchTerm, setSearchTerm] = React.useState("");
// ▼ 페이지내이션 관련
  const [page, setPage] = useState(1);
  const [totaldbcount, setTotaldbcount] = useState("");
// ▼ 댓글
  const [comment, setComment] = useState("");
// ▼ 관리자 댓글 달 시 웹소켓
const { publicmessage, setPublicmessage } = useContext(GradeContext);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // ▼ /api/questions 에 쿼리파라미터로 page와 perpage 를 보내기
        const response = await fetch(`/api/questions?page=${page}&perPage=5`);
        const data = await response.json();
        setQuestions(data.questions);
        setTotaldbcount(data.totaldbcount);
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    };
    fetchQuestions();
  }, [page, selectedPost]);

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
  const dateString = `${year}.${month}.${date}`;
  console.log('저장시간',dateString);

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
        created: dateString,
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

// ▼ 게시글 열람 권한
const handleTitleClick = async (post) => {
  var uid=''
  var state=''
  if(currentUser){
    state=currentUser.state
    if(currentUser.platform){
      if(currentUser.platform=='naver'){
        uid=currentUser.id
      }
    }else{
      uid=currentUser._id
    }} else{
      uid='1'
    }

  try {
    const response = await fetch(`/api/question/see/${post._id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: uid , userState: state }), // 사용자 ID를 함께 보냅니다
    });

    if (response.ok) {
      const data = await response.json();
      settitleOpen(true);
      setSelectedPost(data.post);
    } else {
      console.log('권한이 없습니다.', response);
    }
  } catch (error) {
    console.error('Error:', error);
  }
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

  // ▼ 몽고db 수정기능
  // POST : 새로운 생성 || PATCH : 수정
  const handleSave = async () => {
    try {
      const response = await fetch(`/api/question/edit/${selectedPost._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qcontent: editedContent })
      });
  
      if (response) {
        const updatedPost = await response.json();
        setSelectedPost(updatedPost);
        setIsEditing(false);
        console.log('mongodb edited', response);
        setSelectedPost(null);
      } else {
        console.error('Failed to save the post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // ▼ 몽고db 삭제기능
  const handleDelete = async () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        const response = await fetch(`/api/question/delete/${selectedPost._id}`, {
          method: 'DELETE',
        });
    
        if (response.ok) {
          console.log('Post deleted',response);
          setSelectedPost(null);
        } else {
          console.error('Failed to delete the post');
          console.log('deleted1',error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  
  // ▼ 관리자 댓글 삭제
  const commendelte = async () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      try {
        const response = await fetch(`/api/question/delete2/${selectedPost._id}`, {
          method: 'DELETE',
        });
    
        if (response.ok) {
          console.log('Post deleted',response);
          setSelectedPost(null);
        } else {
          console.error('Failed to delete the post');
          console.log('deleted1',error);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };


  // ▼ 검색 기능
  const searchNew = async () => {
    try {
      const response = await fetch(`/api/question/search/${searchTerm}`);
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    }
  };

  // ▼ 댓글달기
  const commentadd = async () => {
    console.log('댓글내용', comment)
    try {
      const response = await fetch(`/api/question/comment/${selectedPost._id}`, {
        method: 'POST', // 메소드를 'POST'로 변경
        headers: {
          'Content-Type': 'application/json' // 데이터 형식을 JSON으로 명시
        },
        body: JSON.stringify({ // 서버에게 전송할 데이터
          comment: comment,
          commentstate: 1
        })
      });
  
      if (response.ok) {
        console.log('Comment added', response);
        setSelectedPost(null);
      } else {
        console.error('Failed to add the comment');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  

  return (  
    <div className="board_wrap font5" 
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10% 0 0 0',
      width: '1920px',
      height: '760px',
      backgroundImage: `url('${quepage}')`,
      backgroundSize: "100% 100%",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      }}>
      <div className="board_title" style={{width:'70%'}}>
        <h2 className="font6" style={{ fontSize: '36px' }}>
          문의사항
        </h2>
        <h2 style={{ marginTop: '5px', fontSize: '24px' }}>문의사항을 빠르고 정확하게 안내해드립니다.</h2>
      </div>
      {selectedPost ? ( // 선택된 게시글이 있으면 선택된 게시글의 내용을 출력합니다.
        <div className="board" style={{ width: '70%'}}>
          {/* 제목 */}
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '30px 0',borderTop: '2px solid #434343', borderBottom: '2px solid lightgray'}}>
            <h2 className="font6" style={{ fontSize: '28px' }} >{selectedPost.qtitle}</h2>
            <h2 style={{ fontSize: '18px' }} >{selectedPost.created}</h2>
          </div>
        {isEditing ? (
          <div>
            <TextField
              multiline // 줄바꿈 속성
              style={{ width: '100%', textAlign: 'left' }} 
              inputProps={{ style: { height:'20rem' } }}
              value={editedContent} 
              onChange={e => setEditedContent(e.target.value)} 
            />
            <div style={{marginTop: '25px'}}>
             <Button 
                style={{  float: 'right', background: '#242D34', color: '#E0E0E0', border: "none", fontFamily: "노토6" , fontSize: 16, marginLeft:'20px',marginBottom: '5px'}}
                onClick={() => setIsEditing(false)}>취소</Button>
              <Button 
                style={{ float: 'right', backgroundColor: '#F5782A', color: "#F4F4F4", border: "none", fontFamily: "노토6" , fontSize: 16, marginLeft:'15px', marginBottom: '5px'}}
                onClick={handleSave}> 저장</Button>
            </div>
          </div>
        ) : (
          <div>
            {/* 내용 */}
            <h3 style={{paddingLeft:'20px' ,paddingTop:'20px',fontSize: '22px', height:'20rem', borderBottom: '2px solid lightgray' }} >{selectedPost.qcontent}</h3>
            {
            currentUser.state == '1' ? (
              selectedPost.comment ? (
                <div style={{ borderBottom: '2px solid lightgray' }}>
                  <h3 style={{ marginTop: '10px', fontSize: '24px', height:'20rem', borderBottom: '2px solid lightgray' }}>
                    {selectedPost.comment}
                  </h3>
                  <Button 
                    style={{ background: '#242D34', color: '#E0E0E0', border: "none", fontFamily: "노토6" , fontSize: 16, marginBottom:'20px', marginTop: '15px'}}
                    onClick={commendelte}>
                    댓글삭제
                  </Button>
                </div>
              ) : (
                <div style={{ borderBottom: '2px solid lightgray' }}>
                  <TextField
                    multiline
                    style={{ width: '100%', textAlign: 'left' }}
                    inputProps={{ style: { height:'5rem' } }}
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                  />
                  <Button
                    style={{ background: '#242D34', color: '#E0E0E0', border: "none", fontFamily: "노토6" , fontSize: 16, marginBottom:'20px', marginTop: '15px'}}
                    onClick={commentadd}>
                    댓글달기
                  </Button>
                </div>
              )
            ) : (
              selectedPost.comment ? (
                <h3 style={{ paddingLeft:'20px',background:'#F3F3F3',paddingTop:'20px', fontSize: '22px', height:'20rem', borderBottom: '2px solid lightgray' , marginTop:'-10px' }}>
                  {selectedPost.comment}
                </h3>
              ) : (
                <>&nbsp;</>
              )
            )
          }

            <div style={{ marginBottom: '20px'}}> 
              <Button 
                style={{ float: 'right', background: '#242D34', color: '#E0E0E0', border: "none", fontFamily: "노토6" , fontSize: 16, marginLeft:'20px', marginTop: '15px'}}
                onClick={handleDelete}>삭제</Button>
              <Button 
                style={{ float: 'right', backgroundColor: '#F5782A', color: "#F4F4F4", border: "none", fontFamily: "노토6" , fontSize: 16, marginTop: '15px', marginLeft:'20px'}}
                onClick={() => {
                  setIsEditing(true);
                  setEditedContent(selectedPost.qcontent);
              }}>수정</Button>  
              <Button
                style={{marginTop: '15px'}} 
                onClick={handleBackClick}><img src={close} alt="뒤로가기" className="searchimg"/></Button>
            </div>
          </div>
        )}

        </div>
      ) : (
      <div className="board" style={{width:'70%'}}>
        <div className="top">
          <div className="num"  style={{width:'8.75%'}}>번호</div>
          <div className="title"  style={{width:'52.5%'}} >제목</div>
          <div className="writer" style={{width:'17.5%'}} >글쓴이</div>
          <div className="date" style={{width:'17.5%'}} > 등록일 </div>
          <div className="comment" style={{width:'8.75%'}} > 답변 </div>
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

           <div key={index} className="list" >
            <div className="num" style={{width:'8.75%'}}>{(page - 1) * 5 + index + 1}</div>
            <div className="title" style={{width:'52.5%'}} onClick={() => handleTitleClick(post)}>{post.qtitle}</div>
            <div className="writer" style={{width:'17.5%'}} >{post.writer}</div>
            <div className="date" style={{width:'17.5%'}}>{post.created}</div>
            <div className="comment" style={{width:'8.75%'}}>
            {post.commentstate == 1 ? <img src={oncheck}  className="searchimg"/> : <img src={noncheck}  className="searchimg"/>}
          </div>

          </div>
          ))}
        </div>

        {currentUser ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'20px', marginLeft:'15px', marginBottom:'20px'}}>
            <TextField 
              inputProps={{ style: { height: "10px" } }} 
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)} />
            <Button onClick={searchNew}><img src={searchimg} alt="검색" className="searchimg"/></Button>
          </div>
          ) : (
          <div>&nbsp;</div>
          )}

        {currentUser ? (
                <Paging
                  totaldbcount = {totaldbcount}
                  page = {page}
                  setPage = {setPage}
                />
          ) : (
          <div>&nbsp;</div>
          )}

        <div className="upload-button">
        {currentUser ? (
          <Button
            href="#"
            style={{
              background: '#242D34',
              color: '#E0E0E0',
              fontFamily: '노토6',
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
                setState({ ...state, qtitle: "", qcontent: "" });
                // ...`변수명`란? 해당 객체 (배열아님) 전체선택
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
