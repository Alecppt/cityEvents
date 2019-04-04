import React from "react"
import Header from "../components/Header"
import withRoot from "../withRoot"
const App = () =>
{
    return (
        <div>
            <Header/>
            <h1>app</h1>
        </div>
    )
}
export default withRoot(App)