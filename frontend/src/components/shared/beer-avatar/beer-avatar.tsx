import React, { useMemo } from 'react';

import classes from './beer-avatar.scss';

type BeerAvatarProps = {
  picture?: string;
  size?: 'default' | 'small';
};

export default ({ picture, size = 'default' }: BeerAvatarProps) =>
  useMemo(
    () => (
      <figure className={[classes.avatar, classes[size]].join(' ')}>
        <img src={picture} />
      </figure>
    ),
    []
  );
