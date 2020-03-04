import React, { useMemo, useState, useCallback } from 'react';

import Jumbo, { JumboProps } from '../jumbo/jumbo';
import Scroller from './scroller/scroller';

import classes from './left-section.scss';

const LeftSection = () => {
  const [activeBannerIdx, setActiveBannerIdx] = useState(0);

  const banners: JumboProps[] = useMemo(
    () => [
      {
        subTitle: 'Are you representative of brewery ?',
        title: 'Create landing page for your products',
        paragraphs: [
          'Create brewery account',
          'Design your landing page with tool',
          'Publish page and add content where you want',
          'Add beers and watch users opinions'
        ],
        btnContent: 'Create brewery account'
      },
      {
        subTitle: 'You want just beers ?',
        title: 'Create account and use cool features',
        paragraphs: [
          'Create user account',
          'Browse beers and add them to favourites',
          'Write opinions and give feedback about beers',
          'Share your feelings in global board',
          'Check official breweries profiles'
        ],
        btnContent: 'Create normal account'
      }
    ],
    []
  );

  const handleSetActiveBannerIdx = useCallback(() => {
    setActiveBannerIdx(prevIdx => {
      const nextIdx = prevIdx + 1;
      return nextIdx > banners.length - 1 ? 0 : nextIdx;
    });
  }, []);

  return (
    <section className={classes.left}>
      <figure className={classes.banner}></figure>

      <Jumbo {...banners[activeBannerIdx]} />
      <Scroller
        onBannerChange={handleSetActiveBannerIdx}
        arrowRotated={activeBannerIdx === banners.length - 1}
      />
    </section>
  );
};

export default LeftSection;
