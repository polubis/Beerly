import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import Beer from '../home/beers-slider/beer';
import { connect } from 'react-redux';
import classes from './Beers.scss';
import { Beer as BeerEntity } from 'models/beer';
import beersActions from '../../store/actions/beersActions';

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

const BeersPage = ({ beers, beersLoading, beersError, loadBeers }) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadBeers();
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

export default connect(
  ({ beersReducer: { beers, beersLoading, beersError } }: any) => ({
    beers,
    beersLoading,
    beersError
  }),
  { loadBeers: beersActions.BEERS_LOAD }
)(BeersPage);
