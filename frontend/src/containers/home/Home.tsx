import React from 'react';

import Navbar from 'components/shared/navbar/navbar';
import Jumbo from './jumbo/jumbo';

import classes from './Home.scss';

class Home extends React.Component<any, any> {
  render() {
    return (
      <div className={classes.home}>
        <Navbar />
        <Jumbo />
      </div>
    );
  }
}

export default Home;
