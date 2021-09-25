/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, cleanup } from '@testing-library/react';
// import '@testing-library/jest-dom';

import App from '../App';
afterEach(cleanup);

describe('<App />', () => {
  it('renders without errors', () => {
    render(<App />);
  });
});
