import React from 'react';
import { shallow } from 'enzyme';

import Home from '../home/Home';

describe('First React component test with Enzyme', () => {
  it('renders without crashing', () => {
    const result = shallow(<Home />).contains(<div id="home-page" />);
    expect(result).toBeTruthy();
  });
});

describe('testing jest is working', () => {
  it('should return true', () => {
    expect(1).toBe(1);
  });
});
