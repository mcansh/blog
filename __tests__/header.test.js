/* eslint-env jest */
import { shallow } from 'enzyme';
import React from 'react';

import Header, { Title } from '../components/Header';
import posts from '../posts.json';

const [latest] = posts;

describe('Header Component', () => {
  it('Header shows latest post', () => {
    const header = shallow(<Header id={latest.id} link={latest.id} />);
    expect(
      header
        .find(Title)
        .render()
        .text()
    ).toBe(latest.title);
  });

  it('Header shows custom text and image', () => {
    const header = shallow(
      <Header
        title="BLOG"
        image={{
          imageUrl:
            'http://localhost:3000/static/images/posts/1*Wmv8hfi_bTHuHyV5CawnCw.jpg',
        }}
      />
    );
    expect(
      header
        .find(Title)
        .render()
        .text()
    ).toBe('BLOG');
  });
});

// describe('With Snapshot Testing', () => {
//   it('App shows "Hello world!"', () => {
//     const component = renderer.create(<App />);
//     const tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });
