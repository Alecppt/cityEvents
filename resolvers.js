const AWS = require('aws-sdk');
const { AuthenticationError } = require('apollo-server');

require('dotenv').config();
const bucketname = process.env.AWS_BUCKET_NAME;
AWS.config = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
  region: process.env.AWS_REGION
});
const s3 = new AWS.S3();

const authenticated = next => (root, args, context, info) => {
  if (!context.currentUser) {
    throw new AuthenticationError('not logged in \n');
  }

  return next(root, args, context, info);
  //note: https://graphql.org/learn/execution/
};

module.exports = {
  Query: {
    me: authenticated((root, args, context, info) => context.currentUser)
  },
  Mutation: {
    signS3: async (parent, { filename, filetype }) => {
      console.log(filename + ' ' + filetype);
      const s3Param = {
        Bucket: bucketname,
        Key: filename,
        Expires: 60,
        ContentType: filetype
        // ACL: 'public-read'
      };
      const signedRequest = await s3.getSignedUrl('putObject', s3Param);

      const url = `https://${bucketname}.s3.amazonaws.com/${filename}`;
      return {
        signedRequest,
        url
      };
    }
  }
};
