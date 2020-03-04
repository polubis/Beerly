import React from 'react';

import LeftSection from './left-section/left-section';
import RightSection from './right-section/right-section';

import classes from './Register.scss';

const Register = () => (
  <div className={classes.container}>
    <LeftSection />
    <RightSection />
  </div>
);

export default Register;
