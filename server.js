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

const postSchema = new mongoose.Schema(
  {
    id: String,
    pw: String,
  },
  { collection: 'login' },
);

const Post = mongoose.model('Post', postSchema);

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

app.post('/add2', (req, res) => {
  const { email, password, name, gender, age, weight, height } = req.body;
  console.log('Received data: ', email, password, name, gender, age, weight, height);
  res.status(200).json({ message: 'Data received successfully!' });
});

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

app.post('/login', async (req, res) => {
  const { loginid, loginpw } = req.body;

  try {
    const user = await Post.findOne({ id: loginid });

    if (!user) {
      return res.status(400).json({ message: '아이디를 찾을 수 없습니다.', loginid });
    }

    const passwordOK = (loginpw === user.pw);

    if (passwordOK) {
      return res.status(200).json({ message: '로그인 성공!' });
    } else {
      return res.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
    }
  } catch (error) {
    res.status(500).json({ message: '로그인 처리 중에 오류가 발생했습니다.', error: error });
  }
});