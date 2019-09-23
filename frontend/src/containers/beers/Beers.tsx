import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Button } from '@material-ui/core';
import makeBeersProvider, { BeersContext } from 'src/providers/BeersProvider';
import Beer from '../home/beers-slider/beer';
import classes from './Beers.scss';
import beersService from 'services/beers-service';
import { Beer as BeerEntity } from 'models/beer';
import Dialog from 'components/ui/dialog/dialog';
import BeerForm from './beer-form/beer-form';

type BeersPageHeaderProps = {
  openAddBeerDialog: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const BeersPageHeader = ({ openAddBeerDialog }: BeersPageHeaderProps): JSX.Element => (
  <header className={classes.beersHeader}>
    <Button onClick={openAddBeerDialog}>Add beer</Button>
  </header>
);

type BeersListProps = {
  beers: BeerEntity[];
  beersLoading: boolean;
  setBeerToEdit: (beer: BeerEntity) => void;
  setBeerToDelete: (beer: BeerEntity) => void;
};

const BeersList = ({
  beers,
  beersLoading,
  setBeerToEdit,
  setBeerToDelete
}: BeersListProps): JSX.Element => (
  <div className={classes.beers}>
    {beers.map(beer => (
      <Beer
        beer={beer}
        key={beer.id}
        onEditIconClick={() => setBeerToEdit(beer)}
        onDeleteIconClick={() => setBeerToDelete(beer)}
      />
    ))}
    {beersLoading &&
      Array.from({ length: 6 }, (_, idx) => idx).map(idx => (
        <div key={idx} className={classes.beer__placeholder} />
      ))}
  </div>
);

const BeersPage = () => {
  const { merge, swap, beers, beersLoading, optimize } = useContext(BeersContext);
  const [addBeerDialogOpen, setAddBeerDialogOpen] = useState(false);
  const [beerToEdit, setBeerToEdit] = useState<BeerEntity | null>(null);
  const [beerToDelete, setBeerToDelete] = useState<BeerEntity | null>(null);

  // Można zaimplementować strzelani do API z providera - jeszcze mniej kodu
  const handleGetBeers = () => {
    beersLoading || swap(true, 'beersLoading');

    beersService
      .get()
      .toPromise()
      .then(beers => {
        optimize(() => {
          swap(false, 'beersLoading');
          merge(beers, 'beers');
        });
      });
  };

  // Można zaimplementować strzelani do API z providera - jeszcze mniej kodu
  useEffect(() => {
    handleGetBeers();
  }, []);

  const closeBeerFormDialog = useCallback(() => {
    setAddBeerDialogOpen(false);
    setBeerToEdit(null);
  }, []);

  const applyBeersChanges = (beer: BeerEntity) => {
    beerToEdit
      ? swap(
          beers.map(b =>
            b.id === beerToEdit.id ? { ...beerToEdit, ...beer, id: beerToEdit.id } : b
          ),
          'beers'
        )
      : merge([beer], 'beers');
    closeBeerFormDialog();
  };

  const handleDeletingSelectedBeer = () => {
    swap(beers.filter(b => b.id !== beerToDelete!.id), 'beers');
    setBeerToDelete(null);
  };

  return (
    <>
      <BeersPageHeader openAddBeerDialog={() => setAddBeerDialogOpen(true)} />

      <BeersList
        beers={beers}
        beersLoading={beersLoading}
        setBeerToEdit={setBeerToEdit}
        setBeerToDelete={setBeerToDelete}
      />

      <Button disabled={beersLoading} className={classes.loadMoreButton} onClick={handleGetBeers}>
        Load more
      </Button>

      <Dialog open={addBeerDialogOpen || beerToEdit !== null} onClose={closeBeerFormDialog}>
        <BeerForm afterSave={applyBeersChanges} beerToEdit={beerToEdit} />
      </Dialog>

      {/* Kod powinien być osobnym komponentem */}
      {beerToDelete && (
        <Dialog open onClose={() => setBeerToDelete(null)}>
          <div className={classes.confirmation}>
            <h3>Are you sure you want to delete {beerToDelete.name} ?</h3>

            <Beer beer={beerToDelete} />

            <footer className={classes.confirmation__operations}>
              <Button onClick={() => setBeerToDelete(null)}>Cancel</Button>

              <Button onClick={handleDeletingSelectedBeer}>Delete</Button>
            </footer>
          </div>
        </Dialog>
      )}
    </>
  );
};

export default makeBeersProvider(BeersPage);
