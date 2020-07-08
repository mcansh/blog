import React from 'react';

import PostCard, { Post } from '~/components/post-card/index';
import { render, screen } from '~/test-utils';

const post: Post = {
  date: '2019-02-02T00:00:00',
  title: 'React hoooooooooks!',
  path: '/react-hooks-are-amazing',
  image: {
    imageUrl: '/static/images/posts/1_Wmv8hfi_bTHuHyV5CawnCw.jpg',
  },
  editUrl: '/pages/react-hooks-are-amazing',
};

it('renders a post card', () => {
  render(<PostCard {...post} />);

  expect(screen.getByTestId('post-title')).toHaveTextContent(
    'React hoooooooooks!'
  );
  expect(screen.getByTestId('post-date')).toHaveTextContent('February 2, 2019');
  expect(screen.getByTestId('post-link')).toHaveAttribute(
    'href',
    '/react-hooks-are-amazing'
  );
});

it('doesnt have a data-photo attribute', () => {
  render(<PostCard {...post} />);
  expect(screen.getByTestId('post-image')).not.toHaveAttribute('data-photo');
  expect(screen.getByTestId('post-image')).not.toHaveAttribute(
    'data-source-url'
  );
});

it('does have a data-photo attribute', () => {
  render(
    <PostCard
      {...post}
      image={{
        imageUrl: '/static/images/posts/matthew-kane-146076.jpg',
        photographer: 'Matthew Kane',
        url: 'https://unsplash.com/photos/9EM7s13H2I0',
      }}
    />
  );
  expect(screen.getByTestId('post-image')).toHaveAttribute(
    'data-photo',
    'Taken by Matthew Kane'
  );
  expect(screen.getByTestId('post-image')).toHaveAttribute(
    'data-source-url',
    'https://unsplash.com/photos/9EM7s13H2I0?utm_source=unsplash&utm_medium=referral&utm_content=mcansh_blog'
  );
});
