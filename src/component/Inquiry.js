import React, { useState, useEffect } from 'react';
import '../Inquiry.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { getFirestore, collection, query, doc, setDoc, getDocs } from "firebase/firestore";

function Inquiry() {
  const [titleopen, settitleOpen] = useState(false);
  const [postopen, setpostOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);

  const handlepostOpen = () => {
    setpostOpen(true);
  };

  const handleClose = () => {
    setpostOpen(false);
    settitleOpen(false);
  };

  // const handleClose2 = () => {
  //   setpostOpen(false);
  //   settitleOpen(false);
  //   window.location.reload();
  // };

  const getData = async () => {
    const firestore = getFirestore();
    const q = query(collection(firestore, 'notice')); // 'notice' 컬렉션 가져오는 쿼리
  
    const querySnapshot = await getDocs(q);
    let allPosts = [];
    querySnapshot.forEach((doc) => {
      allPosts.push(doc.data());
    });
    setPosts(allPosts);
  };
  
  // useEffect를 사용하여 컴포넌트가 마운트될 때 데이터를 가져오는 로직을 실행합니다.
  useEffect(() => {
    getData();
  }, []); // 의존성 배열을 비워두면 컴포넌트가 처음 렌더링될 때 한 번만 실행됩니다.
  
  const handleAddPost = async (title, writer, content, count) => {
    const firestore = getFirestore();
    const noticeDocRef = doc(firestore, "notice", title);
  
    await setDoc(noticeDocRef, {
      title: title,
      writer: writer,
      date: new Date().toLocaleDateString(),
      count: count,
      content: content
    });
  
    await getData(); // 여기에서 getData를 호출합니다.
    handleClose();
  };

  const handleTitleClick = (post) => {
    setSelectedPost(post);
    settitleOpen(true);
  };

  const handleIncrementCount = async (post) => {
    const firestore = getFirestore();
    const postDocRef = doc(firestore, "notice", post.title);

    await setDoc(postDocRef, {
      ...post, /* post에 모든 내용 복사붙이기 */ 
      count: post.count + 1,
    });

    handleTitleClick(post);
  };

  return (    
    <div className="board_wrap font5" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '10% 0 0 0'}}>
      <div className="board_title" style={{width:'70%'}}>
        <h2 className="font6" style={{ fontSize: '36px' }}>
          공지사항
        </h2>
        <h2 style={{ marginTop: '5px', fontSize: '24px' }}>공지사항을 빠르고 정확하게 안내해드립니다.</h2>
      </div>

      <div className="board"  style={{width:'70%'}}>
        <div className="top">
          <div className="num">번호</div>
          <div className="title">제목</div>
          <div className="writer">글쓴이</div>
          <div className="count">조회수</div>
          <div className="date"> 등록일 </div>
        </div>
        <div className="content" >
          {posts.map((post, index) => (
            <div key={index} className="list">
              <div className="num">{index + 1}</div>
              <div className="title" onClick={() => handleIncrementCount(post)}>{post.title}</div>
              <div className="writer">{post.writer}</div>
              <div className="count">{post.count}</div>
              <div className="date">{post.date}</div>
            </div>
          ))}
        </div>
        <div className="upload-button">
          <Button
            href="#"
            style={{
              background: '#162242',
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
        </div>
        <Dialog open={postopen} onClose={handleClose}>
          <DialogTitle>새로운 게시물</DialogTitle>
          <DialogContent>
            <DialogContentText>제목, 글쓴이, 내용을 입력하세요</DialogContentText>
            <TextField autoFocus margin="dense" id="title" label="제목" type="text" fullWidth />
            <TextField margin="dense" id="writer" label="글쓴이" type="text" fullWidth />
            <TextField margin="dense" id="content" label="내용" type="text" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
            <Button
              onClick={() => {
                const title = document.getElementById('title').value;
                const writer = document.getElementById('writer').value;
                const content = document.getElementById('content').value;
                const count = 0; // 조회수 기본값을 0으로 설정
                handleAddPost(title, writer, content, count);
                setpostOpen(false);
              }}
            >
              확인
            </Button>
          </DialogActions>
        </Dialog>

        {selectedPost && (
          <Dialog open={titleopen} onClose={handleClose}>
            <DialogTitle><h2>{selectedPost.title}</h2></DialogTitle>
            <DialogContent>
              <p>{selectedPost.content}</p>
            </DialogContent>
            <Button onClick={handleClose}>취소</Button>
          </Dialog>
        )}
      </div>
    </div>
  );
}

export default Inquiry;
