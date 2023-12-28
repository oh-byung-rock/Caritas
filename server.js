const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // req 데이터 (body) 해석을 도와준다.
const port = process.env.PORT || 7576;
const path = require('path')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // 전송받은 json데이터를 js형태로 변환
// ---------------- 기능검색 ----------------------
app.use(express.json());
const cors = require('cors');

app.use(cors());
// ---------------- 기능검색 ----------------------
// ------------------------ 몽고 -----------------------------------
const mongoose = require('mongoose');
const { Int32 } = require('mongodb');

// ▼ 문자열 타입의 id 와 pw 라는 필드를 갖는 문서구조를 정의 = 스키마 선언 , 그리고 이걸 Post라는 모델로 사용해서 링크
const postSchema = new mongoose.Schema(
  {
    id: String,
    pw: String,
  },
  { collection: 'login' },
);

const Post = mongoose.model('Post', postSchema);

// ▼ 위와 동일
const infoSchema = new mongoose.Schema(
  {
    uid: String,
    email: String,
    password: String,
    name: String,
    gender: String,
    age: Number,
    weight: Number,
    height: Number
  },
  { collection: 'info' },
);

const Info = mongoose.model('Info', infoSchema);

// // ▼ 위와 동일
// const infonaver = new mongoose.Schema(
//   {
//     uid: String,
//     name: String
//   },
//   { collection: 'info' },
// );

// const Info2 = mongoose.model('Info2', infonaver);

mongoose
  .connect(
    'mongodb+srv://withcaritas0911:aldksfo384@healthgem.sylpzld.mongodb.net/?retryWrites=true&w=majority',
    { dbName: 'todoweb' },
  )
  .then(async () => {
    console.log('MongoDB connected!!');

    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });

  })
  .catch((err) => {
    console.log(err);
  });
//   ------------------------ 몽고 -----------------------------------
// ------------------------ get -----------------------------------
app.use(express.static(path.join(__dirname, '/build')));
app.get('/api', (req, res) => {
    res.sendFile(__dirname + '/src/component/servertest.html');
  });
// ------------------------ get -----------------------------------
// ------------------------ post -----------------------------------
app.post('/add', async (req, res) => {
  const { loginid, loginpw } = req.body;
//   = const title = req.body.title;
//   = const date = req.body.date;

  if (typeof loginid === 'string' && typeof loginpw === 'string') {
    const newInfo = new Post({
      loginid: loginid,
      loginpw: loginpw,
    });

    try {
      const result = await newInfo.save(); // 저장 작업이 완료될 때까지 다음 코드로 넘어가지 않도록 하기 위해
      res.status(200).json({ message: '성공적으로 처리되었습니다!', loginid: loginid, loginpw: loginpw });
    } catch (error) {
      res.status(500).json({ message: '데이터 저장 중에 오류가 발생했습니다.', error: error });
    }
  } else {
    res.status(400).json({ message: '처리 도중 문제가 발생했습니다.' });
  }
});

// ▼ 회원가입
app.post('/add2', async (req, res) => {
  const { email, password, name, gender, age, weight, height } = req.body;
  
  console.log('Received data:', email, password, name, gender, age, weight,height);

  const newInfo = new Info({
      email: email,
      password: password,
      name:name ,
      gender :gender ,
      age :age ,
      weight :weight ,
      height :height 
  });

 try {
    const result = await newInfo.save();
    result.uid = result._id;  
    await result.save();  
    res.status(200).json({ message:'성공적으로 저장되었습니다!',email,password,name ,gender ,age ,weight ,height });
 } catch (error) {
    res.status(500).json({ message:'데이터 저장 중에 오류가 발생했습니다.', error:error });
 }
});
// ▲ 회원가입 백엔드 서버

// ------------------------ post -----------------------------------

app.use(express.urlencoded({ extended: true })); // 서버 측에 데이터를 보낼 때 사용되는 요청 분석 미들웨어
app.use(express.static(__dirname + '/src'));

// ---------------- session 관련 ----------------------
// // npm install passport passport-local express-session 설치
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const session = require('express-session');

// // app.use : 요청과 응답사이에 실행되는것 (=미들웨어)
// app.use(session({secret:'withcaritas0911', resave : true, saveUninitialized: false}));
// app.use(passport.initialize());
// app.use(passport.session());

// // local 방식으로 검사
// app.post('/login', passport.authenticate('local'), (req, res)=>{
//   console.log('Data from client:', req.body);
//   try {
//     res.status(200).json({ message: '성공'});
//   } catch (error) {
//     res.status(500).json({ message: '오류', error: error });
//   }
// })

// passport.use(new LocalStrategy({
//   usernameField: 'loginid', // loginpage.js input에 name 이름
//   passwordField: 'loginpw', // loginpage.js input에 name 이름
//   session: true, // 로그인 후 세션을 저장할것인지 여부
//   passReqToCallback: false,
// }, (loginid, loginpw, done) => {
//   console.log(loginid, loginpw);
//   db.collection('login').findOne({ id: loginid }, function (error, result) {
//     if (error) {console.log(error)}

//     if (!result) return done(null, false, { message: '존재하지않는 아이디' })
//     if (loginpw == result.pw) {
//       return done(null, result) // 다 일치하는경우 2번째 인자에 result
//     } else {
//       return done(null, false, { message: '비번틀렸어요' }) // 일치하지않는경우 2번째인자에 false적고 3번째인자 기입
//     }
//   })
// }));

// // id를 이용해서 세션을 저장 (로그인성공시 작동)
// passport.serializeUser((user,done) => {
//   done(null, user.id)
// });

// // 해당 세션 데이터를 가진 사람을 db에서 찾기 (customerpage.js 접속시 발동)
// passport.deserializeUser((loginid, done) => {
//   done(null,{})
// });
// ---------------- session 관련 ----------------------

app.get('/api/naver/userinfo', (req, res) => {
  const token = req.headers.authorization;
  const weight = req.query.weight;
  const height = req.query.height;

  console.log('서버 토큰',token);
  fetch('https://openapi.naver.com/v1/nid/me', {
    method: 'GET',
    headers: {
      Authorization: `${token}`
    }
  })
  .then(response => response.json())
  .then(async data => {
    // ▼ INFO컬렉션에 해당 uid가 있는지 중복여부판단
    const user = await Info.findOne({uid: data.response.id});

    if (!user) {
      const newInfo = new Info({
        uid: data.response.id,
        name: data.response.name,
        weight: weight,
        height: height
      });
      try {
        const result = await newInfo.save();
        console.log('사용자 정보가 성공적으로 저장되었습니다.');
      } catch (error) {
        console.error('데이터 저장 중에 오류가 발생했습니다.', error);
      }
    }
    res.send(data);
  })
  .catch(error => {
    console.error('사용자의정보',error);
    res.status(500).send(error);
  });
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Info.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: '이메일을 찾을 수 없습니다.', email });
    }

    const passwordOK = (password === user.password);

    if (passwordOK) {
      const { password, ...userWithoutPassword } = user.toObject();
      return res.status(200).json({ message: '로그인 성공!', user: userWithoutPassword });
      
    } else {
      return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
    }
  } catch (error) {
    res.status(500).json({ message: '로그인 처리 중에 오류가 발생했습니다.', error: error });
  }
});

// ▼ 문의사항 관련

const addqSchema = new mongoose.Schema(
  {
    qtitle: String,
    qcontent: String,
    writer: String,
    created: String,
    uid:String,
    comment: String, 
    commentstate: Number,
  },
  { collection: 'question' },
);

const AddQ = mongoose.model('Question', addqSchema);

app.post('/addq', async (req, res) => {
  const { qcontent, qtitle, writer,created,uid } = req.body;
  console.log('서버 문의', qtitle, qcontent, writer,created, uid)

  const newInfo = new AddQ({
      qtitle : qtitle,
      qcontent : qcontent,
      writer : writer,
      created : created,
      uid : uid,
    }); 

  try {
    const result = await newInfo.save(); // 저장 작업이 완료될 때까지 다음 코드로 넘어가지 않도록 하기 위해
    res.status(200).json({ message: '문의하기가 성공적으로 처리되었습니다!' }); 
  } catch (error) {
    res.status(500).json({ message: '데이터 저장 중에 오류가 발생했습니다.', error: error });
  }

  console.log('Received data:', qtitle, qcontent, writer,created);
  // res.send(data); _ data 형식의 응답
  // res.status(200).json _ JSON 형식의 응답

});

// ▼ 문의사항 db 받아오기
app.get('/api/questions', async (req, res) => {
  // ▼ 쿼리 파라미터(query)로 보냈(req)으니 req.query로 받기 , a || b 은 a가 false일때 b 실행
  // 부연설명 : 쿼리 파라미터는 문자열이기 때문에 number로 숫자로 변형 
  const page = Number(req.query.page) || 1; // 현재 페이지 번호. 기본값은 1.
  const perPage = Number(req.query.perPage) || 5; // 한 페이지당 보여줄 아이템의 개수. 기본값은 5.

  try {
    // ▼ 전체데이터(AddQ.find())중에서 n개 만큼 결과를 건너뛰고(skip(n)) 최대 m개 만큼 반환(limit(m))
    const questions = await AddQ.find().skip((page - 1) * perPage).limit(perPage);
    const totaldbcount = await AddQ.countDocuments();   
    res.json({questions, totaldbcount});
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred while fetching questions');
  }
});


// ▼ 문의사항 수정 기능
app.patch('/api/question/edit/:uid', async (req, res) => {
  const { uid } = req.params;
  // req.params :  URL 경로의 일부로 전달되는 변수
  const { qcontent } = req.body;
  console.log('req.params',uid)
  console.log('req.body',qcontent)

  try {
    const post = await AddQ.findById(uid);

    if (post) {
      post.qcontent = qcontent;
      const updatedPost = await post.save();
      res.status(200).json(updatedPost);
    } else {

      res.status(404).json({ message: 'No such post found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error: error });
  }
});

// ▼ 댓글 추가
app.post('/api/question/comment/:uid', async (req, res) => {
  const { uid } = req.params;
  const { comment, commentstate } = req.body; 

  try {
    const post = await AddQ.findById(uid);

    if (post) {
      post.comment = comment; 
      post.commentstate = commentstate; 
      const updatedPost = await post.save();
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ message: 'No such post found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating post', error: error });
  }
});


// ▼ 문의사항 삭제 기능
app.delete('/api/question/delete/:uid', async (req, res) => {
  const { uid } = req.params;
  console.log('delete params',uid)

  try {
    const post = await AddQ.findById(uid);

    if (post) {
      await post.deleteOne();
      console.log('1');
      res.status(200).json({ message: 'Server to Post deleted' });
    } else {
      console.log('2');
      res.status(404).json({ message: 'No such post found' });
    }
  } catch (error) {
    console.log('3',error);
    res.status(500).json({ message: 'Error deleting post', error: error });
  }
});

// ▼ 게시글 열람 권한
app.post('/api/question/see/:id', async (req, res) => {
  const { id } = req.params;
  const { userId, userState } = req.body;
  console.log('wlwl', userState)
  try {
    const post = await AddQ.findById(id);

    if (!post) {
      res.status(404).json({ message: 'No such post found' });
      return;
    }

    if (userState !== '1' && post.uid !== userId) {
      res.status(403).json({ message: '권한이 없습니다.' }); // 사용자 ID가 게시글의 uid와 일치하지 않는 경우 403 오류를 반환합니다
      return;
    }
    
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: 'Error getting post', error: error });
  }
});

// ▼ 검색 기능
app.get('/api/question/search/:searchTerm', async (req, res) => {
  const { searchTerm } = req.params;
  console.log('검색어', searchTerm)

  let questions;

  try {
    if (searchTerm) {
      questions = await AddQ.find({
        qtitle: new RegExp(searchTerm, 'i'),
        // RegExp : search기능
      });
    } else {
      questions = await AddQ.find();
    }
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ message: '데이터 검색 중에 오류가 발생했습니다.', error: error });
    console.log('검색에러', error)
  }
});

// ▼ 마이페이지 신장,몸무게 값 조회
app.get('/checkinfo/:uid', async (req, res) => {
  const uid = req.params.uid;
  const userInfo = await Info.findOne({ uid: uid });

  if (!userInfo) {
    res.status(404).json({ message: '사용자 정보를 찾을 수 없습니다.' });
  } else {
    res.status(200).json({ checkedweight: userInfo.weight, checkedheight: userInfo.height });
  }
});

// ▼ 신장 값 수정
app.patch('/api/info/edit/:uid', async (req, res) => {
  const { uid } = req.params;
  const { height } = req.body;//이건 왜 params랑 body랑 나눔? 

  try {
    const info = await Info.findOne({uid:uid});
    if (info) {
      info.height = height;
      const updatedInfo = await info.save();
      res.status(200).json(updatedInfo);
    } else {
      res.status(404).json({ message: 'No such info found' });
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error updating info', error: error });
  }
});
