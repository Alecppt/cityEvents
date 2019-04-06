import React, { useContext } from "react"
import { withStyles } from "@material-ui/core/styles"
import { Paper } from "@material-ui/core"

import Context  from "../context"
import EmptyContent from "./Pin/EmptyContent"
import CreatePin from "./Pin/CreatePin"

const LocationInfo = ({classes}) => {
    const {state, dispatch} = useContext(Context)
    const { draft } = state 

    let content; 
    if (!draft){
        content = EmptyContent
    }
    else{
        content = CreatePin
    }
    return(
        <div>   
            <Paper className={classes.root}>
                <content />
            </Paper>
        </div>
    )

}

const styles = {
    root: {
      minWidth: 350,
      maxWidth: 400,
      maxHeight: "calc(100vh - 64px)",
      overflowY: "scroll",
      display: "flex",
      justifyContent: "center"
    },
    rootMobile: {
      maxWidth: "100%",
      maxHeight: 300,
      overflowX: "hidden",
      overflowY: "scroll"
    }
  }
export default withStyles(styles)(LocationInfo)