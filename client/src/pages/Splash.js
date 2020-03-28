import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Context from '../context';

function Splash() {
  const { state } = useContext(Context);
  return state.isAuth ? <Redirect to='/'> </Redirect> : <Login />;
}

export default Splash;
