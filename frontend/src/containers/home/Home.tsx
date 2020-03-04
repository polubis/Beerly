import React from 'react';

import BeersSlider from './beers-slider/beers-slider';
import Footer from './footer/footer';
import InfoSection from './info-section/info-section';
import Jumbo from './jumbo/jumbo';
import Meetings from './meetings/meetings';
import Navbar from 'components/shared/navbar/navbar';
import SectionName from './shared/section-name/section-name';
import UserTiles from './user-tiles/user-tiles';
import { colors } from 'src/constants';

import classes from './Home.scss';

class Home extends React.Component<any, any> {
  render() {
    return (
      <div className={classes.home}>
        <Navbar />
        <main>
          <Jumbo />
          <div className={classes['section-name-2']}>
            <SectionName
              color={colors.red}
              title="Secondly"
              description="Add beers to favourites"
            />
          </div>

          <section className={classes['beers-users']}>
            <div className={classes['light-bg-1']} />
            <div className={classes['dark-bg']} />
            <div className={classes['light-bg-2']} />
            <BeersSlider />

            <div className={classes['section-name-3']}>
              <SectionName
                color={colors.grey}
                title="Thirdly"
                description="Explore beer world with others"
              />
            </div>

            <UserTiles />
          </section>

          <div className={classes['section-name-4']}>
            <SectionName
              color={colors.red}
              title="Lastly"
              description="Meet with others and add relationships"
            />
          </div>

          <Meetings />

          <InfoSection />

          <Footer />
        </main>
      </div>
    );
  }
}

export default Home;
