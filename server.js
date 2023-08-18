const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // req 데이터 (body) 해석을 도와준다.
const port = process.env.PORT || 7576;
const cors = require('cors');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // 전송받은 json데이터를 js형태로 변환

// ------------------------ 몽고 -----------------------------------
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    title: String,
    date: String,
  },
  { collection: 'info' },
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
app.use('/src', express.static(__dirname + '/src'));

app.get('/api', (req, res) => {
    res.sendFile(__dirname + '/src/component/servertest.html');
});
// ------------------------ get -----------------------------------
// ------------------------ post -----------------------------------
app.post('/add', async (req, res) => {
  const { title, date } = req.body;
//   = const title = req.body.title;
//   = const date = req.body.date;

  if (typeof title === 'string' && typeof date === 'string') {
    const newInfo = new Post({
      title: title,
      date: date,
    });

    try {
      const result = await newInfo.save(); // 저장 작업이 완료될 때까지 다음 코드로 넘어가지 않도록 하기 위해
      res.status(200).json({ message: '성공적으로 처리되었습니다!', title: title, date: date });
    } catch (error) {
      res.status(500).json({ message: '데이터 저장 중에 오류가 발생했습니다.', error: error });
    }
  } else {
    res.status(400).json({ message: '처리 도중 문제가 발생했습니다.' });
  }
});
// ------------------------ post -----------------------------------


app.use(express.urlencoded({ extended: true })); // 서버 측에 데이터를 보낼 때 사용되는 요청 분석 미들웨어
app.use(express.static(__dirname + '/src'));
