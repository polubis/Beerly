import React, { useContext } from 'react';
import BeersProvider, { BeersContext, BeersProviderState } from 'src/providers/BeersProvider';

const HookedBeers = () => {
  const context = useContext<BeersProviderState>(BeersContext);
  console.log(context.beers);

  return null;
};

class Beers extends React.Component {
  render() {
    return (
      <BeersProvider>
        <HookedBeers />
      </BeersProvider>
    );
  }
}

export default Beers;
