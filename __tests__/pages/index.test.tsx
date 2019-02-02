/* eslint-env jest */
import React from 'react';
import App from '../../pages';
import posts from '../../posts';
import { render } from '../../utils/renderWithIntl';

it('shows all the posts', () => {
  const { getAllByTestId } = render(<App />);
  expect(getAllByTestId('post-link').length).toBe(posts.length);
});
