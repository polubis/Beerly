import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import Logo from 'ui/logo/logo';
import { navbarLinks } from './models';

import classes from './navbar.scss';

type NavbarProps = {};

const Navbar = ({  }: NavbarProps) => {
  return (
    <nav className={classes.navbar}>
      <Logo />
      <div className={classes.links}>
        {navbarLinks.map(({ label, to }) => (
          <NavLink key={label} to={to}>
            {/* activeClassName="selected" ADD IT LATER */}
            {label}
          </NavLink>
        ))}
      </div>

      <div className={classes.links}>
        <Link to="/register">Sign Up</Link>
        <Link to="/register">Sign In</Link>
      </div>
    </nav>
  );
};

export default Navbar;
