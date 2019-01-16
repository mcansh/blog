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

    expect(header.querySelector('img')).toHaveAttribute(
      'src',
      'https://res.cloudinary.com/dof0zryca/image/upload/f_auto/v1541889199/blog/1*Wmv8hfi_bTHuHyV5CawnCw.jpg'
    );
  });
});
