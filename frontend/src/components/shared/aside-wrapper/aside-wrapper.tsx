import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import Logo from 'ui/logo/logo';

import classes from './aside-wrapper.scss';

type AsideWrapperProps = {
  children: ReactNode;
};

export default ({ children }: AsideWrapperProps) => (
  <section className={classes['aside-wrapper']}>
    <div className={classes.logo}>
      <Logo theme="light" />
    </div>

    <div className={classes.content}>{children}</div>

    <div className={classes.links}>
      <Link to="/login">Sign In</Link>
      <span className={classes.divider}></span>
      <Link to="/policy">Policy</Link>
      <span className={classes.divider}></span>
      <Link to="/how-to-use">How to use</Link>
    </div>

    <span className={classes.copyright}>Copyright © 2019 Beerly. All rights reserved</span>
  </section>
);
