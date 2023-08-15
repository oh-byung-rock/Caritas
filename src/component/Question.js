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

function Question(authorName) {
  const [titleopen, settitleOpen] = useState(false);
  const [postopen, setpostOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedPostContent, setSelectedPostContent] = useState(null);
  const [currentUserUid, setCurrentUserUid] = useState(null);
  const [testing, settesting] = useState(false);

  const handlepostOpen = () => {
    setpostOpen(true);
  };

  const handleClose = () => {
    setpostOpen(false);
    settitleOpen(false);
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

  const handleTitleClick = async (post) => {
    setSelectedPost(post);
    settitleOpen(true);

    const firestore = getFirestore();
    const noti_question_re_test_info = doc(firestore, "noti_question_re_test", post.aid);
    const postContentDoc = await getDoc(noti_question_re_test_info);

    if (postContentDoc.exists()) {
      setSelectedPostContent(postContentDoc.data().content);
    } else {
      console.log("No such document!");
    }
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

  useEffect(() => {
    const getData = async () => {
      const firestore = getFirestore();
      const col = collection(firestore, "noti_quetion_test");
  
      // 기존 코드의 수정된 부분
      const info = JSON.parse(window.sessionStorage.getItem("kol"));
      console.log('세션값2 : ', info)
      if (info && info.uid) {
        const q = query(
          col,
          orderBy("timestamp", "desc"),
          where("timestamp", ">=", Timestamp.fromDate(new Date(0))), //이게 0이랑 같을거임
          where("uid", "==", info.uid),
          limit(5)
        );
  
        const querySnapshot = await getDocs(q);

        let allPosts = [];
        querySnapshot.forEach((doc) => {
          allPosts.push(doc.data());
        });
        setPosts(allPosts);
        
        console.log('테이블 정보', allPosts)
      } else {
        console.log('해당 데이터 없음')
      }
      
    };
      getData();
      settesting(false)
  }, [testing]);
  
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
          {/* index만큼 post를 나타내서 게시물을 차례대로 나타낸다. */}
          {posts.map((post, index) => (
            <div key={index} className="list">
              <div className="num">{index + 1}</div>
              <div className="title" onClick={() => handleTitleClick(post)}>{post.title}</div>
              <div className="writer"style={{width:'17.5%'}} >{authorName.authorName}</div>
              <div className="date" style={{width:'17.5%'}}>{post.timestamp.toDate().toLocaleDateString()}</div>
            </div>
          ))}
        </div>
        <div className="upload-button">
        {currentUserUid ? (
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
            <TextField autoFocus margin="dense" id="title" label="제목" type="text" fullWidth />
            <TextField margin="dense" id="content" label="내용" type="text" fullWidth />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>취소</Button>
            <Button
              onClick={(event) => {
                event.preventDefault();
                const title = document.getElementById('title').value;
                const content = document.getElementById('content').value;
                handleAddPost(title, content);
                settesting(true);
                setpostOpen(false);
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
              <h2>{selectedPost.title}</h2>
              <h2>{selectedPostContent}</h2>
            </DialogContent>
            <Button onClick={handleClose}>취소</Button>
          </Dialog>
        )}
      </div>
    </div>
  );
}

export default Question;
