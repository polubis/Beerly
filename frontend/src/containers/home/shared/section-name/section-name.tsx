import React from 'react';

import classes from './section-name.scss';

type SectionNameProps = {
  title: string;
  description: string;
  color: string;
};

const SectionName = ({ title, description, color }: SectionNameProps) => (
  <div style={{ color }} className={classes['section-name']}>
    <span>{title}</span>
    <h5 dangerouslySetInnerHTML={{__html: description}}></h5>
  </div>
);

export default SectionName;
