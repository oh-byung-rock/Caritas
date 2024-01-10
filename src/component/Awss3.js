import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

const s3 = new AWS.S3();

const uploadFile = async (fileName, fileContent) => {
  const params = {
    Bucket: 'sbzerohiddengem',
    Key: fileName,
    Body: fileContent
  };

  try {
    const data = await s3.upload(params).promise();
    console.log(`File uploaded successfully at ${data.Location}`);
  } catch (err) {
    console.error(err);
  }
};

export default uploadFile;
