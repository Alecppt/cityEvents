import React, { useContext } from "react"
import {withStyles} from "@material-ui/core/styles"
import Context from "../context";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import MapIcon from "@material-ui/icons/Map"

const Header = ({classes}) =>
{
    const {state } = useContext(Context)
    const {currentUser} = state
    
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <div className={classes.grow}>
                        <MapIcon className={classes.icon}></MapIcon>
                        <Typography
                         component="h1"
                         variant="h6"
                         color="inherit"
                         noWrap
                         >
                           cityEvents
                        </Typography>
                    </div>
                    {currentUser && (
                        <div className={classes.grow}>
                        <img
                            className={classes.picture}
                            src={currentUser.picture}
                            alt={currentUser.name}
                        ></img>
                        <Typography
                            variant="h5"
                            color="inherit"
                            noWrap
                        >
                            {currentUser.name}
                        </Typography>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>

    )
}
const styles = theme => ({
    root: {
      flexGrow: 1
    },
    grow: {
      flexGrow: 1,
      display: "flex",
      alignItems: "center"
    },
    icon: {
      marginRight: theme.spacing.unit,
      color: "green",
      fontSize: 45
    },
    mobile: {
      display: "none"
    },
    picture: {
      height: "50px",
      borderRadius: "90%",
      marginRight: theme.spacing.unit * 2
    }
  });
  

export default withStyles(styles)(Header)