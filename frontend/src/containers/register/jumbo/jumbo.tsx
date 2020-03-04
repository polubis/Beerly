import React from 'react';

import Button from 'ui/button/button';

import classes from './jumbo.scss';

export type JumboProps = {
  title: string;
  subTitle: string;
  paragraphs: string[];
  btnContent: string | JSX.Element;
};

export default ({ title, subTitle, paragraphs, btnContent }: JumboProps) => (
  <div className={classes.jumbo}>
    <strong>{subTitle}</strong>
    <h3>{title}</h3>

    <div className={classes.paragraphs}>
      {paragraphs.map(par => (
        <p key={par}>{par}</p>
      ))}
    </div>

    <Button content={btnContent} variant="outlined-red-white" />
  </div>
);
