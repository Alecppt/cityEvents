import React from "react"
import {withStyles} from "@material-ui/core/styles"
import Explore from "@material-ui/icons/Explore"
import Typography from "@material-ui/core/Typography"

const EmptyContent = ({classes}) =>
{
    return( 
    <div className={classes.root}>
        <Explore 
            className={classes.icon}
        />
        <Typography
            noWrap
            component="h3"
            variant="h6"
            align="center"
            color="textPrimary"
            gutterBottom

        >
            Click on the map to add a place
        </Typography>
    </div>
    )
}

const styles = theme => ({
    root: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center"
    },
    icon: {
      margin: theme.spacing.unit,
      fontSize: "60px"
    }
  });
  
  export default withStyles(styles)(EmptyContent);
  