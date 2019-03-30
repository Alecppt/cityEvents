const User = require('../models/User')

const {OAuth2Client} = require('google-auth-library')

const client = new OAuth2Client(process.env.OAUTH_GOOGLE_CLIENT_ID)

exports.findOrCreateUser = token =>
{
    // verify auth token
    // check if there is the user in DB, if yes return user, else create new user
}

const verifyAuthToken = async token => {
    try {
        await client.verifyIdToken({
            idToken: token,
            audience: process.env.OAUTH_GOOGLE_CLIENT_ID
        })
    } catch (error) {
        
    }
}