import React from 'react';

import AsideWrapper from 'components/shared/aside-wrapper/aside-wrapper';
import RegisterForm from './register-form/register-form';

import classes from './Register.scss';

class Register extends React.Component<any, any> {
  render() {
    return (
      <div className={classes.register}>
        <section
          className={classes['image-section']}
          style={{ backgroundImage: 'url(../../../public/images/bootle.jpg)' }}
        ></section>

        <AsideWrapper>
          <h3>Sign up</h3>

          <RegisterForm />
        </AsideWrapper>
      </div>
    );
  }
}

export default Register;
