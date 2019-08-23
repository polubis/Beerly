import React, { useMemo } from 'react';

import classes from './footer.scss';

export default () =>
  useMemo(() => {
    return (
      <footer className={classes.footer}>
        <div className={classes.content}>seiams</div>
      </footer>
    );
  }, []);
