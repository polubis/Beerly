import React, { useEffect, useState } from 'react';
import { Button } from '@material-ui/core';
import Beer from '../home/beers-slider/beer';
import { connect } from 'react-redux';
import classes from './Beers.scss';
import { Beer as BeerEntity } from 'models/beer';
import beersActions from '../../store/actions/beersActions';
import beersService from 'services/beers-service';

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

const BeersPage = ({
  beers,
  beersLoading,
  beersError,
  beersLoad,
  beersLoadSuccess,
  beersLoadFailure
}) => {
  const [page, setPage] = useState(1);

  const handleLoadBeers = () => {
    beersLoad();
    beersService
      .get()
      .toPromise()
      .then(beers => {
        beersLoadSuccess(beers);
      })
      .catch(err => {
        beersLoadFailure(beers);
      });
  };

  useEffect(() => {
    handleLoadBeers();
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

const mapStateToProps = state => {
  return {
    beers: state.beersReducer.beers,
    beersLoading: state.beersReducer.beersLoading,
    beersError: state.beersReducer.beersError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    beersLoad: () => dispatch(beersActions.BEERS_LOAD()),
    beersLoadSuccess: beers => dispatch(beersActions.BEERS_LOAD_SUCCESS(beers)),
    beersLoadFailure: () => dispatch(beersActions.BEERS_LOAD_FAILURE())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BeersPage);
