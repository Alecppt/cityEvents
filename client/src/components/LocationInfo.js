import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

import EmptyContent from './Pin/EmptyContent';
import CreatePin from './Pin/CreatePin';
import Context from '../context';

const LocationInfo = ({ classes }) => {
  const { state } = useContext(Context);
  const { draft } = state;

  let PinContent;
  if (!draft) {
    PinContent = EmptyContent;
  } else {
    PinContent = CreatePin;
  }
  return (
    <Paper className={classes.root}>
      <PinContent />
    </Paper>
  );
};

const styles = {
  root: {
    minWidth: 350,
    maxWidth: 400,
    maxHeight: 'calc(100vh - 64px)',
    overflowY: 'scroll',
    display: 'flex',
    justifyContent: 'center'
  },
  rootMobile: {
    maxWidth: '100%',
    maxHeight: 300,
    overflowX: 'hidden',
    overflowY: 'scroll'
  }
};

export default withStyles(styles)(LocationInfo);
