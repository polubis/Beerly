import React, { useMemo, useState } from 'react';

import { Button } from '@material-ui/core';

import FormField from 'components/shared/form/form-field/form-field';
import beersService from 'services/beers-service';
import { useForm, PureFields } from 'components/shared/form/useForm';

import classes from './beer-form.scss';
import { Beer } from 'models/beer';
import { BeerFormFields, createConfig } from './beer-form-config';

type BeerFormProps = {
  beerToEdit: Beer | null;
  afterSave: (beer: Beer) => void;
};

const BeerForm = ({ beerToEdit, afterSave }: BeerFormProps) => {
  // Ta logika może śmiało polecieć useForm
  const [saving, setSaving] = useState(false);

  const config = useMemo(() => createConfig(beerToEdit), []);

  // Ta logika może śmiało polecieć useForm
  const handleSave = (beersFormFields: PureFields<BeerFormFields>) => {
    setSaving(true);

    const newBeer: Partial<Beer> = {
      ...beersFormFields,
      averageCost: { value: beersFormFields.price, currency: beersFormFields.currency }
    };

    const apiCall = beerToEdit ? beersService.edit : beersService.add;

    apiCall(newBeer)
      .toPromise()
      .then(beer => {
        afterSave(beer);
      })
      .catch(() => {
        setSaving(false);
      });
  };

  const {
    state: { keys, fields, errorsOccured },
    handleTyping,
    handleSubmit
  } = useForm<BeerFormFields>(config, handleSave);

  return (
    // Można zastąpić komponentem
    <form className={classes.beerForm} onSubmit={handleSubmit}>
      <h3>{beerToEdit ? `Your are editing ${beerToEdit.name} beer` : 'Add new beer'}</h3>

      {keys.map(key => (
        <FormField
          key={key}
          fieldkey={key}
          onChange={handleTyping}
          title={config[key].title}
          autoFocus={config[key].autoFocus}
          {...fields[key]}
        />
      ))}

      {saving && <span className={classes.backdrop}>Saving...</span>}

      <Button type="submit" disabled={errorsOccured || saving}>
        Save
      </Button>
    </form>
  );
};

export default BeerForm;
