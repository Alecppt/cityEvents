const user = {
    _id: "1",
    name: "Alec",
    email: "cca169@sfu.ca",
    picture: ""
}



module.exports = {
    Query: {
        me: () => user
    }
}