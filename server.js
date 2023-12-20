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

// ▼ 위와 동일
const infonaver = new mongoose.Schema(
  {
    uid: String,
    name: String
  },
  { collection: 'info' },
);

const Info2 = mongoose.model('Info2', infonaver);

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

// ▼ 회원가입 백엔드 서버
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
  const { uid, name } = req.body;
  console.log('Received naver data:', uid, name );
  
  const token = req.headers.authorization;
  console.log('서버 토큰',token);
  fetch('https://openapi.naver.com/v1/nid/me', {
    method: 'GET',
    headers: {
      Authorization: `${token}`
    }
  })
  .then(response => response.json())
  .then(data => {
    console.log('사용자 전체 정보', data);
    console.log('사용자 uid', data.response.id);
    console.log('사용자 이름', data.response.name);
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

app.post('/addq', async (req, res) => {
  const { qcontent, qtitle } = req.body;
  
  console.log('Received data:', qcontent, qtitle);
  
  res.status(200).json({ message: 'Data received successfully' });
});