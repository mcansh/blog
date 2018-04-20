/* eslint-env jest */
import { shallow } from 'enzyme';
import React from 'react';

import App from '../../pages/index';
import Header from '../../components/Header';
import PostCard from '../../components/PostCard';

import posts from '../../posts.json';

describe('With Enzyme', () => {
  it('App renders', () => {
    const app = shallow(<App />);

    expect(app.find(Header)).toHaveLength(1);
  });

  it('shows all the posts', () => {
    const app = shallow(<App />);

    expect(app.find(PostCard)).toHaveLength(posts.length);
  });
});
