import React from 'react';

import classes from './Home.scss';

class Home extends React.Component<any, any> {
  render() {
    return (
      <div id="home-page" className={classes.home}>
        Home Page
      </div>
    );
  }
}

export default Home;
