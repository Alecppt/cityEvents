import React, { useContext, useState, useEffect } from "react"
import ReactMapGL, {NavigationControl, Marker} from "react-map-gl"
import {withStyles} from "@material-ui/core/styles"

import Pinicon from "./PinIcon"
import LocationInfo from "./LocationInfo"
import Context from "../context"

const INIITIAL_VIEWPORT = {
    latitude:  49.2827,
    longitude: -123.1207,
    zoom: 14

}

const Map = ({classes}) => {
    const {state, dispatch} = useContext(Context)
    const [viewport, setViewport] = useState(INIITIAL_VIEWPORT)
    const [userPosition, setUserPosition] = useState(null)
    useEffect(() => {
      getUserPosition()
    }, [])

    const getUserPosition = () => {
      if ("geolocation" in navigator) 
      {
        navigator.geolocation.getCurrentPosition(position => {
          const {latitude, longitude} = position.coords
          setViewport({...viewport, latitude, longitude})
          setUserPosition({longitude, latitude})
          
        })
      }
    }
    const handleMapClick = ({lngLat, leftButton} )=> {
      if (!leftButton) return 
      if (!state.draft) {
        dispatch({type: "CREATE_DRAFT"})
      }
      const [longitude, latitude] = lngLat
      dispatch({
        type: "UPDATE_DRAFT_LOCATION",
        payload: {longitude, latitude}
      })
    }

    return (
        <div className={classes.root}>
            <ReactMapGL
                width="100vw"
                height="calc(100vh - 64px)"
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxApiAccessToken="pk.eyJ1IjoiYWxlY3BwdCIsImEiOiJjanUyM3NpZWUwOGdkNDRxZzV1emQydTd0In0.4gA0NErJ4LjKk8GLzXKvng"
                onViewportChange = {newViewport => setViewport(newViewport)} 
                {...viewport}
                onClick={handleMapClick}
            > 
            <div className={classes.navigationControl}>
              <NavigationControl
                onViewportChange={ newViewport => setViewport(newViewport)}
              ></NavigationControl>
            </div>
            //pin user current position
            { userPosition && 
              <Marker
              latitude={userPosition.latitude}
              longitude={userPosition.longitude}
              offsetLeft={-19}
              offsetTop={-37}
              >
                <Pinicon
                  size={40}
                  color="red"
                />
              </Marker>
            }
            { state.draft && 
              (
                <Marker
              latitude={state.draft.latitude}
              longitude={state.draft.longitude}
              offsetLeft={-19}
              offsetTop={-37}
              draggable
              onDragEnd={({lngLat}) => {
                const [longitude, latitude] = lngLat
                dispatch({type: "UPDATE_DRAFT_LOCATION",
                          payload: {longitude, latitude}
                        })
                      }}
              >
                <Pinicon
                  size={40}
                  color="gray"
                />
              </Marker>
              )
            }
            </ReactMapGL>

            <LocationInfo>
              
            </LocationInfo>
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
