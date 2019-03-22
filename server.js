const {ApolloServer} = require ('apollo-server')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI,  {userNewUrlParser: true })
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err));

const server = new ApolloServer({
    
    typeDefs,
    resolvers
});


server.listen().then (({url}) => {
    console.log(`server listening on ${url}`);
});