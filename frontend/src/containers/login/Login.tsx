import React from 'react';

import classes from './Login.scss';

class Login extends React.Component<any, any> {
  render() {
    return (
      <div id='login-page' className={classes.login}>Hello from LogIn</div>
    );  
  }
}

export default Login;