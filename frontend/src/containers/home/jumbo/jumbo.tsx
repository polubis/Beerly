import React from 'react';

import AccessIcon from '@material-ui/icons/accessibility';
import SearchIcon from '@material-ui/icons/Search';
import StarIcon from '@material-ui/icons/StarBorder';

import JumboGraphic from './jumbo-graphic/jumbo-graphic';
import SectionName from '../shared/section-name/section-name';
import { colors } from 'src/constants';

import classes from './jumbo.scss';

const Jumbo = () => {
  return (
    <section className={classes.jumbo}>
      <div className={classes.jumbo__text}>
        <SectionName
          title="First of all"
          description="Browse beers from all over the world"
          color={colors.main}
        />
        <ul>
          <svg height="181.25" viewBox="0 0 526.653 181.25">
            <path
              d="M6193.377,0l203.341,181.25L6720.03,0Z"
              transform="translate(-6193.377)"
              fill="rgba(30,30,30,0.02)"
            />
          </svg>
          <li>
            <button>
              <AccessIcon />
            </button>
            <span>be part of community - increase beers base</span>
          </li>
          <li>
            <button>
              <SearchIcon />
            </button>
            <span>find your favourite beers</span>
          </li>
          <li>
            <button>
              <StarIcon />
            </button>
            <span>add your ratings</span>
          </li>
        </ul>
      </div>
      <JumboGraphic />
    </section>
  );
};

export default Jumbo;
