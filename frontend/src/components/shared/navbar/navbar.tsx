import React, { useState, useCallback } from 'react';
import { Link, NavLink } from 'react-router-dom';

import MenuIcon from '@material-ui/icons/Menu';

import Logo from 'ui/logo/logo';
import { navbarLinks } from './models';

import classes from './navbar.scss';

type NavbarProps = {};

const Navbar = ({  }: NavbarProps) => {
  const [isMobileNavOpen, updateIsMobileNavOpen] = useState<boolean>(false);

  const handleUpdateIsMobileNavOpen = useCallback(() => {
    updateIsMobileNavOpen(!isMobileNavOpen);
  }, [isMobileNavOpen]);

  return (
    <nav className={classes.navbar}>
      <Logo />
      <div className={classes.links}>
        {navbarLinks.map(({ label, to }) => (
          <NavLink key={label} to={to}>
            {label}
          </NavLink>
        ))}
      </div>

      <div className={classes.links}>
        <Link to="/register">Sign Up</Link>
        <Link to="/login">Sign In</Link>
      </div>

      <button className={classes['mobile-nav-btn']} onClick={handleUpdateIsMobileNavOpen}>
        <MenuIcon />
      </button>

      {isMobileNavOpen && (
        <div className={classes['mobile-nav']}>Soon here will be implemented mobile navigation</div>
      )}
    </nav>
  );
};

export default Navbar;
