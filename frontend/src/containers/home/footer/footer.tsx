import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import Logo from 'components/ui/logo/logo';

import classes from './footer.scss';

export default () =>
  useMemo(() => {
    return (
      <footer className={classes.footer}>
        <div className={classes.content}>
          <div className={classes['stay-connected']}>
            <h5 className={classes.title}>Stay connected</h5>
            <span className={classes.description}>
              Get information about the latest beers in your area. Learn about prices and opinions
            </span>

            <div className={classes['email-input']}>
              <input placeholder="Type your email here" />
              <button>Send</button>
            </div>
          </div>

          <div className={classes['we-started']}>
            <h5 className={classes.title}>We started for fun</h5>

            <span className={classes.description}>
              Two friends met in the pub wondering about the choice of beer. There were holidays and
              we had little time to make decisions. It would be nice to have an app that will take
              it for us.
            </span>

            <span className={classes.description}>
              One month later we started working on <b>Beerly</b>
            </span>
          </div>

          <div className={classes.navigate}>
            <h5 className={classes.title}>Navigate</h5>

            <Link to="/">Home</Link>
            <Link to="/beer">Beer</Link>
            <Link to="/breweries">Breweries</Link>
            <Link to="/login">Sign In</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        </div>

        <div className={classes['bottom-content']}>
          <Logo theme="light" />

          <div className={classes.links}>
            <Link to="/policy">Privacy policy</Link>
            <Link to="/about">Contact</Link>
            <Link to="/authors">Authors</Link>
          </div>
        </div>
      </footer>
    );
  }, []);
