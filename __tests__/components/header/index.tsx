import React from 'react';

import { render, screen } from '~/test-utils';
import Header from '~/components/header';

describe('Header Component', () => {
  it('shows custom text and image', () => {
    render(
      <Header
        title="BLOG"
        image={{
          imageUrl: '/static/images/posts/1*Wmv8hfi_bTHuHyV5CawnCw.jpg',
        }}
      />
    );

    expect(screen.getByTestId('header')).toHaveTextContent('BLOG');
    expect(screen.getByTestId('header_img')).toHaveAttribute(
      'src',
      '/api/image/static/images/posts/1*Wmv8hfi_bTHuHyV5CawnCw.jpg'
    );
  });
});
