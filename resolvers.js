const { AuthenticationError } = require('apollo-server')

//dummy data

const user = {
    _id: "1",
    name: "Alec",
    email: "cca169@sfu.ca",
    picture: ""
}

const authenticated = next => (root, args, context, info) => {
    if(!context.currentUser)
    {
        throw new AuthenticationError('not logged in \n')
    }

    return next(root, args, context, info )
    //note: https://graphql.org/learn/execution/
}

module.exports = {
    Query: {
        me: authenticated((root, args, context, info) => context.currentUser)
    }
}