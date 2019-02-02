/* eslint-env jest */
import React from 'react';
import PostCard from '../../components/PostCard';
import posts from '../../posts';
import { render } from '../../utils/renderWithIntl';

describe('PostCard Component', () => {
  it('shows image, title, and date', () => {
    const [post] = posts;
    const { getByTestId } = render(<PostCard {...post} />);

    expect(getByTestId('post-title')).toHaveTextContent(
      "Why I'm learning software development"
    );
    expect(getByTestId('post-date')).toHaveTextContent('October 2, 2016');
    expect(getByTestId('post-link')).toHaveAttribute(
      'href',
      '/why-im-learning-software-development'
    );
  });
});
