const { gql } = require('apollo-server');

module.exports = gql`
  type S3Payload {
    signedRequest: String!
    url: String!
  }

  type User {
    _id: ID
    name: String
    email: String
    picture: String
  }

  type Pin {
    _id: ID
    createdAt: String
    title: String
    content: String
    image: String
    latitude: Float
    longitude: Float
    author: User
    comments: [Comment]
  }

  type Comment {
    text: String
    createdAt: String
    author: User
  }

  type Query {
    me: User
  }

  type Mutation {
    signS3(filename: String!, filetype: String!): S3Payload!
  }
`;
