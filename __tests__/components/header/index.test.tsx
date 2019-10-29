import React from 'react';

import { render } from '~/utils/render-with-intl';
import Header from '~/components/header';

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

    expect(getByTestId('header')).toHaveTextContent('BLOG');

    expect(getByTestId('header_img')).toHaveAttribute(
      'src',
      'https://res.cloudinary.com/dof0zryca/image/upload/f_auto/v1541889199/blog/1*Wmv8hfi_bTHuHyV5CawnCw.jpg'
    );
  });
  it('shows "Read More" button when passed a link', () => {
    const { getByText } = render(
      <Header
        image={{ imageUrl: '1*Wmv8hfi_bTHuHyV5CawnCw.jpg' }}
        url="https://google.com"
        title="My sweet new blog post!"
      />
    );
    expect(getByText('Read More').parentElement!).toHaveAttribute(
      'href',
      'https://google.com'
    );
  });
});
