/* eslint-env jest */
import React from 'react';
import 'jest-styled-components';
import { render } from '../../utils/renderWithIntl';
import Header from '../../components/Header';

describe('Header Component', () => {
  it('shows custom text and image', () => {
    const { getByTestId } = render(
      <Header
        title="BLOG"
        image={{
          imageUrl: '1*Wmv8hfi_bTHuHyV5CawnCw.jpg',
        }}
      />
    );

    const header = getByTestId('header');

    expect(header.textContent).toEqual('BLOG');

    expect(header.querySelector('img').src).toEqual(
      'http://localhost:3000/static/images/posts/1*Wmv8hfi_bTHuHyV5CawnCw.jpg'
    );
  });
});
