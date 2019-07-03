import React from 'react';
import { shallow } from 'enzyme';

import Home from '../home/Home';

describe('First React component test with Enzyme', () => {
  it('renders without crashing', () => {
    shallow(<Home />);
  });
});

describe('testing jest is working', () => {
  it('should return true', () => {
    expect(1).toBe(1);
  });
});
