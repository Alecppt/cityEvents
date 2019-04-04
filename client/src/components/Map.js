import React, { useContext } from "react"
import ReactMapGL from "react-map-gl"

import {withStyles} from "@material-ui/core/styles"

const viewPort = {
    latitude:  49.2827,
    longitude: -123.1207,
    zoom: 13

}

const Map = ({classes}) => {
    

    return (
        <div className={classes.root}>
            <ReactMapGL
                width="100vw"
                height="calc(100vh - 64px)"
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxApiAccessToken="pk.eyJ1IjoiYWxlY3BwdCIsImEiOiJjanUyM3NpZWUwOGdkNDRxZzV1emQydTd0In0.4gA0NErJ4LjKk8GLzXKvng"
                {...viewPort}
            />
        </div>
    )
}

const styles = {
    root: {
      display: "flex"
    },
    rootMobile: {
      display: "flex",
      flexDirection: "column-reverse"
    },
    navigationControl: {
      position: "absolute",
      top: 0,
      left: 0,
      margin: "1em"
    },
    deleteIcon: {
      color: "red"
    },
    popupImage: {
      padding: "0.4em",
      height: 200,
      width: 200,
      objectFit: "cover"
    },
    popupTab: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column"
    }
  };
  
  export default withStyles(styles)(Map);
