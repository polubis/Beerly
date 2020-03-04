import React from 'react';

import classes from './section-name.scss';

type SectionNameProps = {
  title: string;
  description: string;
  color: string;
};

const SectionName = ({ title, description, color }: SectionNameProps) => (
  <div style={{ color }} className={classes['section-name']}>
    <span className={classes['section-name__title']}>
      <span style={{ background: color }} className={classes.marker} />
      {title}
    </span>
    <h5 dangerouslySetInnerHTML={{ __html: description }} />
  </div>
);

export default SectionName;
