import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import Beer from '../home/beers-slider/beer';
import classes from './Beers.scss';
import { Beer as BeerEntity } from 'models/beer';
import BeersDataService from 'src/data-services/BeersDataService';
import { EnhancedData } from 'src/data-services';

type BeersListProps = {
  beers: BeerEntity[];
  beersLoading: boolean;
};

const BeersList = ({ beers, beersLoading }: BeersListProps): JSX.Element => (
  <div className={classes.beers}>
    {beers.map(beer => (
      <Beer beer={beer} key={beer.id} />
    ))}
    {beersLoading &&
      Array.from({ length: 6 }, (_, idx) => idx).map(idx => (
        <div key={idx} className={classes.beer__placeholder} />
      ))}
  </div>
);

const BeersPage = () => {
  const [{ data: beers, isLoading: beersLoading }, setBeers] = useState(
    new EnhancedData<BeerEntity[]>([])
  );
  const [page, setPage] = useState(1);

  useEffect(() => {
    const sub = BeersDataService.beers.subscribe(value => {
      setBeers(value);
    });

    return () => {
      sub.unsubscribe();
    };
  }, []);

  useEffect(() => {
    BeersDataService.loadAllBeers(page);
  }, [page]);

  return (
    <>
      <BeersList beers={beers} beersLoading={beersLoading} />
      <Button
        disabled={beersLoading}
        className={classes.loadMoreButton}
        onClick={() => setPage(page + 1)}
      >
        Load more
      </Button>
    </>
  );
};

export default BeersPage;
