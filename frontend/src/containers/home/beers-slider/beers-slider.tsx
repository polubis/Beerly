import React, { useState, useEffect } from 'react';

import beersService from 'services/beers-service';
import BeerComponent from './beer';
import Slider from 'ui/slider/slider';
import { Beer } from 'src/models/beer';

const BeersSlider = ({}) => {
  const [beers, setBeers] = useState<Beer[]>([]);

  useEffect(() => {
    beersService.getRecommended().subscribe(beers => setBeers(beers));
  }, []);

  return (
    <Slider items={beers} renderComponent={beer => <BeerComponent key={beer.id} beer={beer} />} />
  );
};

export default BeersSlider;
