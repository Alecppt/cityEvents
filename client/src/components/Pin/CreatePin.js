import React, { useState, useContext } from 'react';
import axios from 'axios';
import { GraphQLClient } from 'graphql-request';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AddAPhotoIcon from '@material-ui/icons/AddAPhotoTwoTone';
import AddLocation from '@material-ui/icons/AddLocationTwoTone';
import ClearIcon from '@material-ui/icons/Clear';
import SaveIcon from '@material-ui/icons/SaveTwoTone';

import Context from '../../context';
import { SIGNS3 } from '../../graphql/mutations';

const CreatePin = ({ classes }) => {
  const { dispatch } = useContext(Context);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [content, setContent] = useState('');

  const handleImageUpload = async () => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'cityEvents');
    data.append('cloud_name', 'dbq5yk25z');
    const idToken = window.gapi.auth2
      .getAuthInstance()
      .currentUser.get()
      .getAuthResponse().id_token;
    const client = new GraphQLClient('http://localhost:4000/graphql', {
      header: { authorization: idToken }
    });
    const variable = { filename: image.name, filetype: image.type };
    const { signS3 } = await client.request(SIGNS3, variable);
    const { signedRequest, url } = signS3;
    console.log(signedRequest);
    await uploadToS3(image, signedRequest);
    // console.log(url);
  };

  const uploadToS3 = async (file, signedRequest) => {
    console.log(file.type);
    const options = {
      headers: {
        'Content-Type': file.type
      }
    };
    await axios.put(signedRequest, file, options);
  };
  const handleSubmit = async event => {
    event.preventDefault();
    const url = await handleImageUpload();
    console.log({ title, image, url, content });
  };

  const handleDiscard = event => {
    setTitle('');
    setImage('');
    setContent('');
    dispatch({ type: 'DELETE_DRAFT' });
  };
  return (
    <form className={classes.form}>
      <Typography
        className={classes.alignCenter}
        component='h2'
        variant='h5'
        color='secondary'
        style={{ marginLeft: '-65px' }}
      >
        <AddLocation className={classes.iconLarge}></AddLocation>
        Add a location
      </Typography>
      <div style={{ marginLeft: 6 }}>
        <TextField
          name='title'
          label='title'
          autoComplete='off'
          placeholder='Insert pin title'
          onChange={e => setTitle(e.target.value)}
        />
        <input
          accept='image/x-png,image/gif,image/jpeg'
          id='image'
          type='file'
          className={classes.input}
          onChange={e => setImage(e.target.files[0])}
        />
        <label htmlFor='image'>
          <Button
            style={{ color: image && '#009624' }}
            component='span'
            size='small'
            className={classes.button}
          >
            <AddAPhotoIcon />
          </Button>
        </label>
      </div>
      <div className={classes.contentField}>
        <TextField
          name='content'
          label='Content'
          multiline
          rows='6'
          margin='normal'
          fullWidth
          variant='outlined'
          onChange={e => setContent(e.target.value)}
        ></TextField>
      </div>
      <div>
        <Button
          className={classes.button}
          variant='contained'
          color='primary'
          onClick={handleDiscard}
        >
          <ClearIcon className={classes.leftIcon} />
          Discard
        </Button>
        <Button
          type='submit'
          className={classes.button}
          variant='contained'
          color='secondary'
          disabled={!title.trim() || !content.trim() || !image}
          onClick={handleSubmit}
        >
          Submit
          <SaveIcon className={classes.rightIcon} />
        </Button>
      </div>
    </form>
  );
};

const styles = theme => ({
  form: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: theme.spacing.unit
  },
  contentField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '95%'
  },
  input: {
    display: 'none'
  },
  alignCenter: {
    display: 'flex',
    alignItems: 'center'
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
