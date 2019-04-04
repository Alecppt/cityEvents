import React, {useContext} from "react"
import Context from "../../context"
import {GoogleLogout} from "react-google-login"
import Typography from "@material-ui/core/Typography"
import {withStyles} from "@material-ui/core/styles"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"


const Signout = ({classes}) =>
{
    const {dispatch} = useContext(Context)

    const onSignout = () => {
        dispatch({type: "SIGNOUT_USER"})
    }
    return (
        <div>
            <GoogleLogout
                onLogoutSuccess={onSignout}
                // buttonText="Signout"
                render={ ({onClick}) => (
                    <div>
                        <span className={classes.root}
                              onClick={onClick}      
                        >
                            <Typography
                                variant = "body1"
                                className={classes.buttonText}
                            >
                                Signout
                            </Typography>
                            <ExitToAppIcon className={classes.buttonIcon} />
                        </span>
                    </div>
                ) }
            />
        </div>
    )
}

const styles = {
    root: {
      cursor: "pointer",
      display: "flex"
    },
    buttonText: {
      color: "white"
    },
    buttonIcon: {
      marginLeft: "5px",
      color: "orange"
    }
  };
  
  export default withStyles(styles)(Signout);