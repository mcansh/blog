/* eslint-env jest */
import React from 'react';
import PostCard, { Post } from '~/components/post-card/index.tsx';
import { render } from '~/utils/render-with-intl.tsx';

const post: Post = {
  date: 1549144492819,
  title: 'React hoooooooooks!',
  url: '/react-hooks-are-amazing',
  image: {
    imageUrl: '/static/images/posts/1_Wmv8hfi_bTHuHyV5CawnCw.jpg',
  },
};

describe('PostCard Component', () => {
  it('renders a post card', () => {
    const { getByTestId } = render(<PostCard {...post} />);

    expect(getByTestId('post-title')).toHaveTextContent('React hoooooooooks!');
    expect(getByTestId('post-date')).toHaveTextContent('February 2, 2019');
    expect(getByTestId('post-link')).toHaveAttribute(
      'href',
      '/react-hooks-are-amazing'
    );
  });
});
