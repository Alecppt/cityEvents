export const SIGNS3 = `
mutation ($filename: String!, $filetype: String!) {
    signS3(filename: $filename, filetype: $filetype) {
      signedRequest
      url
    }
  }  
`;
