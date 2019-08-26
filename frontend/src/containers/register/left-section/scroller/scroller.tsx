import React from 'react';

import ArrowIcon from '@material-ui/icons/ArrowDownward';

import Button from 'ui/button/button';

import classes from './scroller.scss';

type ScrollerProps = {
  onBannerChange: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  arrowRotated: boolean;
};

export default ({ onBannerChange, arrowRotated }: ScrollerProps) => {
  return (
    <div className={[classes.scroller, classes[arrowRotated ? 'rotated' : '']].join(' ')}>
      <Button onClick={onBannerChange} content={<ArrowIcon />} variant="circled" />
    </div>
  );
};
