import React, { useMemo } from 'react';

import classes from './user-avatar.scss';

type UserAvatarProps = {
  picture?: string;
  size?: 'default';
};

export default ({ picture, size = 'default' }: UserAvatarProps) =>
  useMemo(
    () => (
      <figure className={[classes.avatar, classes[size]].join(' ')}>
        <img src={picture} />
      </figure>
    ),
    [picture]
  );
