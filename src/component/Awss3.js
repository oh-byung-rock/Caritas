import AWS from 'aws-sdk';
import anany from '../assets/anany.png'

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
  region: process.env.REACT_APP_AWS_REGION
});

const s3 = new AWS.S3();

export const uploadFile = async (fileName, fileContent) => {
  console.log('키위',process.env.REACT_APP_AWS_ACCESS_KEY_ID);
  const params = {
    Bucket: 'sbzerohiddengem',
    Key: fileName,
    Body: fileContent,
  };

  try {
    console.log('피피1');
    const data = await s3.upload(params).promise();
    console.log(`File uploaded successfully at ${data.Location}`);
  } catch (err) {
    console.log('피피2');
    console.error('피피에러',err);
    throw err; // 이 부분을 추가하여 에러를 던지도록 합니다.
  }
};


export const getFile = async (userId, setPhotoURL) => {
  // userId가 없는 경우에 대한 예외 처리
  if (!userId) {
    console.error('유저 ID가 없습니다.');
    setPhotoURL(anany); // 유저 ID가 없을 경우 기본 이미지 할당
    return;
  }

  const fileName = `images/${userId}`;

  const params = {
    Bucket: 'sbzerohiddengem',
    Key: fileName,
  };

  try {
    const data = await s3.getObject(params).promise();
    const blob = new Blob([data.Body], { type: 'image/jpeg' });
    const url = URL.createObjectURL(blob);
    setPhotoURL(url);
  } catch (err) {
    console.error('파일 불러오기 중에 문제가 발생했습니다.', err);
    setPhotoURL(anany); // 파일을 불러오는 데 실패했을 경우 기본 이미지 할당
  }
};
