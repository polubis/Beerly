import React, { useMemo } from 'react';

import BeerAvatar from 'components/shared/beer-avatar/beer-avatar';
import Rates from 'components/shared/rates/rates';
import UserAvatar from 'components/shared/user-avatar/user-avatar';
import UserTilesFacade from './user-tiles-facade';

import classes from './user-tiles.scss';

const UserTiles = ({}) =>
  useMemo(
    () => (
      <UserTilesFacade>
        {({ users }) => (
          <div className={classes.users}>
            {users.map(user => (
              <div key={user.id} className={classes.tile}>
                <header>
                  <UserAvatar picture={user.picture} />

                  <div className={classes.personality}>
                    <span>{user.firstName}</span>
                    <span>{user.lastName}</span>
                  </div>
                </header>

                <p>{user.gender === 'Male' ? 'His' : 'Her'} favourites</p>

                <ul>
                  {user.favouriteBeers.map(beer => (
                    <li key={beer.id}>
                      <BeerAvatar picture={beer.picture} size="small" />
                      <div className={classes['beer-name-rate']}>
                        <span>{beer.name}</span>
                        <Rates rate={beer.rate} variant="small" />
                      </div>
                    </li>
                  ))}
                </ul>

                <button className={classes.profile}>PROFILE</button>
              </div>
            ))}
          </div>
        )}
      </UserTilesFacade>
    ),
    []
  );

export default UserTiles;
