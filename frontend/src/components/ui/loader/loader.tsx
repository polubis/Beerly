import React, { memo } from 'react';

import classes from './loader.scss';

type LoaderProps = {
  overlayed?: boolean;
};

const Loader = ({ overlayed = false }: LoaderProps) => {
  const bubbles = Array.from({ length: 12 }, (_, idx) => idx);
  const foams = Array.from({ length: 5 }, (_, idx) => idx);

  return (
    <div className={[classes.loader, overlayed ? classes['loader-overlayed'] : ''].join(' ')}>
      <div className={classes.glass}>
        {foams.map(f => (
          <div key={f} className={classes.foam} />
        ))}
        {bubbles.map(b => (
          <span key={b} className={classes.bubble} />
        ))}
      </div>
      <span className={classes.handle}></span>
    </div>
  );
};

export default memo(Loader);
