const User = require('../models/User')

const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client(process.env.OAUTH_GOOGLE_CLIENT_ID)

exports.findOrCreateUser = async token =>
{
    // verify auth token
    const googleUser = await verifyAuthToken(token)
    // check if there is the user in DB, if yes return user, else create new user
    const user = await getExistedUser(googleUser.email)

    return user ? user : createNewUser(googleUser)
}

const verifyAuthToken = async token => {
    try {
      const ticket =  await client.verifyIdToken({
            idToken: token,
            audience: process.env.OAUTH_GOOGLE_CLIENT_ID
        })

        return ticket.getPayload()
    } catch (error) {
        console.error("verifying auth tokten error", error)     
    }
}

const getExistedUser = async email => await User.findOne({email}).exec()

const createNewUser = googleUser => {
    const {name, email, picture} = googleUser
    const user = {name, email, picture}
    return new User(user).save()
}