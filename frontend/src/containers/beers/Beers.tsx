import React, { useContext, useEffect } from 'react';
import makeBeersProvider, { BeersContext } from 'src/providers/BeersProvider';

const HookedBeers = () => {
  const context = useContext(BeersContext);
  console.log(context.beers);

  useEffect(() => {
    context.swap([], 'beers');
  }, []);

  return null;
};

class Beers extends React.Component {
  render() {
    return <HookedBeers />;
  }
}

export default makeBeersProvider(Beers);
