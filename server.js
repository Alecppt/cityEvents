const {ApolloServer} = require ('apollo-server')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const mongoose = require('mongoose')

const {findOrCreateUSer} = require('./controllers/userController')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI,  {userNewUrlParser: true })
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err));

const server = new ApolloServer({
    
    typeDefs,
    resolvers,
    context: ({ req }) => {
        let authToken = null
        try
        {
            authToken = req.headers.authorization
            if (authToken)
            {
                
            }
        }catch (err)
        {
            console.error(`Unable to authenticate, token: ${authToken}`)
        }
    }
});


server.listen().then (({url}) => {
    console.log(`server listening on ${url}`);
});