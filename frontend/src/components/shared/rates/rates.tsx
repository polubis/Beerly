import React, { memo } from 'react';

import StarIcon from '@material-ui/icons/Stars';

import classes from './rates.scss';

type RatesProps = {
  rate?: number;
  variant?: 'default' | 'small';
};

const allowedRates = [1, 2, 3, 4, 5];

const Rates = ({ rate = 0, variant = 'default' }: RatesProps) => {
  const numberOfStarsToColor = Math.round(rate);

  return (
    <div className={[classes.rates, classes[variant]].join(' ')}>
      {allowedRates.map(rate => (
        <StarIcon key={rate} className={rate <= numberOfStarsToColor ? classes.colored : ''} />
      ))}
    </div>
  );
};

export default memo(Rates);
