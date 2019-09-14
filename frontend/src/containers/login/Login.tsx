import React from 'react';

import LeftSection from './left-section/left-section';
import RightSection from './right-section/right-section';

import classes from './Login.scss';

class Login extends React.Component<any, any> {
  render() {
    return (
      <div id='login-page' className={classes.login}>
          <LeftSection />
          <RightSection />
      </div>
    );  
  }
}

export default Login;