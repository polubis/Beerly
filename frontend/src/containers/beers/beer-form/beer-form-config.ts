import { Validator as V } from 'components/shared/form/validator';
import { FieldsConfig } from 'components/shared/form/useForm';
import { Beer } from 'models/beer';

export type BeerFormFields =
  | 'name'
  | 'subName'
  | 'description'
  | 'type'
  | 'kindOf'
  | 'brewery'
  | 'alcohol'
  | 'price'
  | 'currency';

export const createConfig = (beerToEdit: Beer | null) => {
  return {
    name: {
      title: 'Name',
      autoFocus: true,
      validate: val =>
        V.one(
          new V(val)
            .required()
            .min(3)
            .max(20)
        ),
      initValue: beerToEdit ? beerToEdit.name : ''
    },
    subName: {
      title: 'Sub name',
      validate: val => V.one(new V(val).min(3).max(20)),
      initValue: beerToEdit ? beerToEdit.subName : ''
    },
    description: {
      title: 'Description',
      validate: val => V.one(new V(val).min(20).max(250)),
      initValue: beerToEdit ? beerToEdit.description : ''
    },
    type: {
      title: 'Type',
      validate: val => V.one(new V(val).oneOf('Lagger', 'Dark Lagger')),
      initValue: beerToEdit ? beerToEdit.type : ''
    },
    kindOf: {
      title: 'Kind Of',
      validate: val => V.one(new V(val).oneOf('Wheat', 'Hop')),
      initValue: beerToEdit ? beerToEdit.kindOf : ''
    },
    brewery: {
      title: 'Brewery',
      validate: val =>
        V.one(
          new V(val)
            .required()
            .min(3)
            .max(20)
        ),
      initValue: beerToEdit ? beerToEdit.brewery : ''
    },
    alcohol: {
      title: 'Alcohol',
      type: 'number',
      validate: val => V.one(new V(val).required().percentage()),
      initValue: beerToEdit ? beerToEdit.alcohol : ''
    },
    price: {
      title: 'Price',
      type: 'number',
      validate: val => V.one(new V(val).required().price()),
      initValue: beerToEdit ? beerToEdit.averageCost.value : ''
    },
    currency: {
      title: 'Currency',
      validate: val => V.one(new V(val).oneOf('Zł', '$')),
      initValue: beerToEdit ? beerToEdit.averageCost.currency : ''
    }
  } as FieldsConfig<BeerFormFields>;
};
