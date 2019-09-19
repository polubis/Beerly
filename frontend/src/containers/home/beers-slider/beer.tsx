import React, { useMemo } from 'react';

import AddToBasementIcon from '@material-ui/icons/PlaylistAdd';
import CommentIcon from '@material-ui/icons/Comment';

import Rates from 'components/shared/rates/rates';
import { Beer } from 'models/beer';

import classes from './beer.scss';

type BeerProps = {
  beer: Beer;
};

export default ({ beer }: BeerProps) =>
  useMemo(
    () => (
      <div key={beer.id} className={classes.beer}>
        <Rates rate={beer.rate} />
        <p>{beer.header}</p>
        <figure>
          <img src={beer.picture} />
        </figure>

        <div className={classes.content}>
          <span className={classes.kind}>{beer.kindOf}</span>
          <span className={classes.name}>{beer.name}</span>
          <span className={classes['sub-name-type']}>
            {beer.subName} <b>({beer.type})</b>
          </span>

          <span className={classes.description}>{beer.description}</span>

          <section className={classes.details}>
            <div>
              <span>Brewery</span>
              <span>{beer.brewery}</span>
            </div>
            <div>
              <span>Avg. cost</span>
              <span>
                {beer.averageCost.value} {beer.averageCost.currency}
              </span>
            </div>
            <div>
              <span>Alcohol</span>
              <span>{beer.alcohol} %</span>
            </div>
          </section>

          <footer className={classes.operations}>
            <CommentIcon />
            <AddToBasementIcon />
          </footer>
        </div>
      </div>
    ),
    [beer.rate]
  );
