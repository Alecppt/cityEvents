import React from "react"
import { MuiThemeProvider, createMuiTheme} from "@material-ui/core/styles"
import lightBlue from "@material-ui/core/colors/lightBlue"
import teal from "@material-ui/core/colors/teal"
import CssBaseline from "@material-ui/core/CssBaseline"

const theme = createMuiTheme({
    palette: {
        primary:{
          light: lightBlue[200],
          main: lightBlue[500],
          dark: lightBlue[700]
        },
        secondary: {
            light: teal[300],
            main: teal[500],
            dark: teal[700]
        },
    },
    typography: {
        useNextVariants: true
      }    
})
function withRoot(Component) {
    function WithRoot(props) {
      // MuiThemeProvider makes the theme available down the React tree
      // thanks to React context.
      return (
        <MuiThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          {/* https://material-ui.com/getting-started/usage/#cssbaseline */}
          <CssBaseline />
          <Component {...props} />
        </MuiThemeProvider>
      );
    }
  
    return WithRoot;
  }
  
  export default withRoot;

