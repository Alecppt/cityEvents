import React from "react"
import {GoogleLogin} from "react-google-login"
import {withStyle} from "@material-ui/core/styles"

const Login = ({classes}) =>
{
    return (
        <div>
            <GoogleLogin
                clientId="995284673460-hd34nbj3vk3e8u6lssc9behebcffopcs.apps.googleusercontent.com"
                />
        </div>
    )
}

const styles = {

}

export default Login