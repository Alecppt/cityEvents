import React from "react"
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddAPhotoIcon from "@material-ui/icons/AddAPhotoTwoTone";
import AddLocation from "@material-ui/icons/AddLocationTwoTone";
import ClearIcon from "@material-ui/icons/Clear";
import SaveIcon from "@material-ui/icons/SaveTwoTone";


const CreatePin = ({classes}) =>
{
    return( 
        <form className={classes.form}>
            <Typography
                className={classes.alignCenter}
                component="h3"
                variant="h5"
                color="secondary"
            >
                <AddLocation className={classes.iconLarge}></AddLocation>
                Add a location
            </Typography>
            <div
              style={{marginLeft: 6}}
            >            
                <TextField
                    name='title'
                    label="title"
                    placeholder="Insert pin title"
                ></TextField>
                <input
                    accept="image"
                    id="image"
                    type="file"
                    className={classes.input}
                ></input>
                <label htmlFor="image">
                    <Button 
                        component="span"
                        size="small"
                        className={classes.button}
                        >
                        <AddAPhotoIcon />
                        </Button>
                </label>
            </div>
            <div className={classes.contentField}>
              <TextField
                name="content"
                label="Content"
                multiline
                rows="6"
                margin='normal'
                fullWidth
                variant="outlined"
                >

              </TextField>
            </div>
            <div>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
              >
                <ClearIcon className={classes.leftIcon} />

                  Discard

              </Button>
              <Button
                type="submit"
                className={classes.button}
                variant="contained"
                color="secondary"
              >
              
                Submit

                <SaveIcon className={classes.rightIcon} />

              </Button>
            </div>
        </form>

    )
}


const styles = theme => ({
    form: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      paddingBottom: theme.spacing.unit
    },
    contentField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: "95%"
    },
    input: {
      display: "none"
    },
    alignCenter: {
      display: "flex",
      alignItems: "center"
    },
    iconLarge: {
      fontSize: 40,
      marginRight: theme.spacing.unit
    },
    leftIcon: {
      fontSize: 20,
      marginRight: theme.spacing.unit
    },
    rightIcon: {
      fontSize: 20,
      marginLeft: theme.spacing.unit
    },
    button: {
      marginTop: theme.spacing.unit * 2,
      marginBottom: theme.spacing.unit * 2,
      marginRight: theme.spacing.unit,
      marginLeft: 0
    }
  });
  
  export default withStyles(styles)(CreatePin);