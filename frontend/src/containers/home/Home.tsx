import React from 'react';

import Navbar from '../../components/home/navbar/navbar';

import classes from './Home.scss';

class Home extends React.Component<any, any> {
  render() {
    return (
      <div id="home-page" className={classes.home}>
        <Navbar />
        Home Page
      </div>
    );
  }
}

export default Home;
