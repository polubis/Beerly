import React, { useMemo } from 'react';

import classes from './info-section.scss';

export default () =>
  useMemo(() => {
    return (
      <section className={classes.info}>
        <div>
          <h5>For breweries</h5>

          <p>Create brewery account</p>
          <p>Design your landing page with tool</p>
          <p>Publish page and add content where you want</p>
          <p>Add beers and watch users opinions</p>

          <span className={classes.divider} />

          <button>Run for details</button>
        </div>

        <div>
          <h5>For users</h5>

          <p>Create user account</p>
          <p>Browse beers and add them to favourites</p>
          <p>Write opinions and give feedback about beers</p>
          <p>Share your feelings in global board</p>
          <p>Check official breweries profiles</p>

          <span className={classes.divider} />

          <button>Run for details</button>
        </div>
      </section>
    );
  }, []);
