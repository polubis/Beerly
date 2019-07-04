import React from 'react';

import Logo from '../../../shared/logo/logo';

import classes from './navbar.scss';

const Navbar = ({ }): JSX.Element => (
  <nav className={classes.navbar}>
    <Logo />
  </nav>
);

export default Navbar;