/* eslint-env jest */
import { shallow } from 'enzyme';
import React from 'react';
import 'jest-styled-components';

import PostCard, { Title } from '../../components/PostCard';
import posts from '../../posts.json';

describe('PostCard Component', () => {
  it('shows image, title, and date', () => {
    const [latest] = posts;
    const post = shallow(
      <PostCard
        key={latest.id}
        image={latest.image}
        date={latest.date}
        title={latest.title}
        id={latest.id}
      />
    );
    expect(
      post
        .find(Title)
        .render()
        .text()
    ).toBe(latest.title);
  });
});
