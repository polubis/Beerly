import React from 'react';
import { render } from '@testing-library/react';

import Home from '../home/Home';

describe('<Home />', () => {
  test('should render component with "Home Page" text', () => {
    const { getByText } = render(<Home />);
    expect(getByText('Home Page')).toBeInTheDocument()
  });
});