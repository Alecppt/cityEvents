import React from "react"
import Header from "../components/Header"
import withRoot from "../withRoot"
import Map from '../components/Map'



const App = () =>
{
    return (
        <div>
            <Header/>
            <Map />
            {/* <h1>app</h1> */}
        </div>
    )
}
export default withRoot(App)