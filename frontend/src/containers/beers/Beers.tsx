import React, { useContext, useEffect } from 'react';
import makeBeersProvider, { BeersContext } from 'src/providers/BeersProvider';
import Beer from '../home/beers-slider/beer';
import classes from './Beers.scss';
import { Button } from '@material-ui/core';
import { Beer as BeerEntity } from 'models/beer';
import beersService from 'services/beers-service';

type BeersListProps = {
  beers: BeerEntity[];
  beersLoading: boolean;
};

const BeersList = ({ beers, beersLoading }: BeersListProps): JSX.Element => {
  const mappedBeers: BeerEntity[] = beers.map((beer, idx) => ({
    ...beer,
    id: idx
  }));

  const beersPlaceholders = beersLoading ? Array.from({ length: 6 }, (_, idx) => idx) : [];

  return (
    <div className={classes.beers}>
      {mappedBeers.map(beer => (
        <Beer beer={beer} key={beer.id} />
      ))}
      {beersPlaceholders.map(idx => (
        <div key={idx} className={classes.beer__placeholder} />
      ))}
    </div>
  );
};

const BeersPage = () => {
  const { merge, swap, beers, beersLoading, optimize } = useContext(BeersContext);

  const handleGetBeers = () => {
    beersLoading || swap(true, 'beersLoading');

    beersService
      .getBeers()
      .toPromise()
      .then(beers => {
        optimize(() => merge(beers, 'beers'), () => swap(false, 'beersLoading'));
      });
  };

  useEffect(() => {
    handleGetBeers();
  }, []);

  return (
    <>
      <BeersList beers={beers} beersLoading={beersLoading} />
      <Button disabled={beersLoading} className={classes.loadMoreButton} onClick={handleGetBeers}>
        Load more
      </Button>
    </>
  );
};

export default makeBeersProvider(BeersPage);
