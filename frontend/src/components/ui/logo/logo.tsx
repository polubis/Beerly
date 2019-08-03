import React from 'react';

import { Link } from 'react-router-dom';

import classes from './logo.scss';

const Logo = ({}): JSX.Element => (
  <Link to="/">
    <div className={classes.logo}>
      <svg width="12" height="44.81" viewBox="0 0 12 44.81">
        <g transform="translate(-319.715 -30)">
          <path
            d="M577.111,101.257a17.292,17.292,0,0,1-2.663.062.581.581,0,0,0-.639.5l-1.7,12.739a5.172,5.172,0,0,1-1.1,2.524,5.5,5.5,0,0,0-1.238,4.2v21.64s-.11,2.885,2.107,2.885a32.05,32.05,0,0,0,7.991,0s1.775-.336,1.775-3V121.51a5.212,5.212,0,0,0-1.1-4.237,5.3,5.3,0,0,1-1.063-2.509l-1.764-13.006A.581.581,0,0,0,577.111,101.257Z"
            transform="translate(-250.02 -71.256)"
          />
          <rect
            width="7.032"
            height="18.411"
            rx="3.516"
            transform="translate(322.243 50.221)"
            fill="#fffcf9"
          />
        </g>
      </svg>

      <span className={classes.logo_name}>Beerly</span>
    </div>
  </Link>
);

export default Logo;
