import React from "react"
import {GoogleLogin} from "react-google-login"
import {GraphQLClient} from "graphql-request"
import {withStyles} from "@material-ui/core/styles"

const responseGoogle = (response) => {
    console.log(response);
  }
const ME_QUERY = `
{
    me {
        _id
        name
        email
        picture
    }
}`
const onSuccess = async googleUser => {
    const idToken = googleUser.getAuthResponse().id_token
    const client = new GraphQLClient('http://localhost:4000/graphql', {headers:{authorization: idToken}})
    const data = await client.request(ME_QUERY)
     console.log({ data })
 }

const Login = ({classes}) =>
{
    

    return (
        <div>
            <GoogleLogin
                clientId="995284673460-h6k7nlekvpqvildh292n73dcsti9hmgh.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                theme="dark"
                />
        </div>
    )
}

const styles = {
    root: {
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        margin: "0 3px"
    }
}

// export default Login
export default withStyles(styles)(Login);