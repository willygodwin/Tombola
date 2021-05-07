const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
  accessKeyId: process.env.aws_access_key_id,
  secretAccessKey: process.env.aws_secret_access_key,
});



// Set S3 endpoint to DigitalOcean Spaces
const spacesEndpoint = new aws.Endpoint('sfo3.digitaloceanspaces.com');
const s3 = new aws.S3({
  endpoint: spacesEndpoint
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'tombolaproject3',
    acl: 'public-read',
    key: function (request, file, cb) {
      console.log(file);
      cb(null, `${Date.now().toString()}-${file.originalname}`);
    }
  })
})

module.exports = upload 