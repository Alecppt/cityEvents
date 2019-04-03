import React, { useContext }from "react"
import {GoogleLogin} from "react-google-login"
import {GraphQLClient} from "graphql-request"
import {withStyles} from "@material-ui/core/styles"
import Context from '../../context'
import { ME_QUERY } from '../../graphql/queries'


const Login = ({classes}) =>
{
    
const { dispatch } = useContext(Context)
const onSuccess = async googleUser => {
    
    try
    {
    const idToken = googleUser.getAuthResponse().id_token
    const client = new GraphQLClient('http://localhost:4000/graphql', {headers:{authorization: idToken}})
    const { me } = await client.request(ME_QUERY)
    dispatch({type: "LOGIN_USER", payload: me })
    }
    catch(err)
    {
        onFailure(err)
    }
 }

 const onFailure = err => console.error("error logging in", err)

    return (
        <div className={classes.root}>
            <GoogleLogin
                clientId="995284673460-h6k7nlekvpqvildh292n73dcsti9hmgh.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={onSuccess}
                onFailure={onFailure}
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