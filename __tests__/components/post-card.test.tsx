import React from 'react';
import PostCard, { Post } from '~/components/post-card/index';
import { render } from '~/utils/render-with-intl';

const post: Post = {
  date: '2019-02-02T00:00:00',
  title: 'React hoooooooooks!',
  path: '/react-hooks-are-amazing',
  image: {
    imageUrl: '/static/images/posts/1_Wmv8hfi_bTHuHyV5CawnCw.jpg',
  },
};

it('renders a post card', () => {
  const { getByTestId } = render(<PostCard {...post} />);

  expect(getByTestId('post-title')).toHaveTextContent('React hoooooooooks!');
  expect(getByTestId('post-date')).toHaveTextContent('February 2, 2019');
  expect(getByTestId('post-link')).toHaveAttribute(
    'href',
    '/react-hooks-are-amazing'
  );
});

it('doesnt have a data-photo attribute', () => {
  const { getByTestId } = render(<PostCard {...post} />);
  expect(getByTestId('post-image')).not.toHaveAttribute('data-photo');
  expect(getByTestId('post-image')).not.toHaveAttribute('data-source-url');
});

it('does have a data-photo attribute', () => {
  const { getByTestId } = render(
    <PostCard
      {...post}
      image={{
        imageUrl: 'matthew-kane-146076.jpg',
        photographer: 'Matthew Kane',
        url: 'https://unsplash.com/photos/9EM7s13H2I0',
      }}
    />
  );
  expect(getByTestId('post-image')).toHaveAttribute(
    'data-photo',
    'Taken by Matthew Kane'
  );
  expect(getByTestId('post-image')).toHaveAttribute(
    'data-source-url',
    'https://unsplash.com/photos/9EM7s13H2I0?utm_source=unsplash&utm_medium=referral&utm_content=mcansh_blog'
  );
});
