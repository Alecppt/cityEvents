const {ApolloServer} = require ('apollo-server')
const typeDefs = require('./typeDefs')
const resolvers = require('./resolvers')
const mongoose = require('mongoose')

const {findOrCreateUser} = require('./controllers/userController')
require('dotenv').config()

mongoose.connect(process.env.MONGO_URI,  {userNewUrlParser: true })
    .then(() => console.log("DB connected"))
    .catch(err => console.log(err));

const server = new ApolloServer({
    
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        let authToken = null
        let currentUser = null
        try
        {
            authToken = req.headers.authorization
            if (authToken)
            {
                // find user in DB, or create user
                currentUser = await findOrCreateUser(authToken)
            }
        }catch (error)
        {
            console.error(`Unable to authenticate, token: ${authToken}`, error)
        }
        return { currentUser }
    }
});


server.listen().then (({url}) => {
    console.log(`server listening on ${url}`);
});