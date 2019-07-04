import React from 'react';

import Navbar from '../../components/home/navbar/navbar';

import './Home.scss';

class Home extends React.Component<any, any> {
  render() {
    return (
      <div id="home-page">

        <Navbar />

      </div>
    );
  }
}

export default Home;
