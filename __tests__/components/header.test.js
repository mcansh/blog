/* eslint-env jest */
import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

import Header, { Title } from '../../components/Header';

describe('Header Component', () => {
  it('shows custom text and image', () => {
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

describe('Header component with Snapshot Testing', () => {
  it('shows custom text and image', () => {
    const component = renderer.create(
      <Header
        title="BLOG"
        image={{
          imageUrl:
            'http://localhost:3000/static/images/posts/1*Wmv8hfi_bTHuHyV5CawnCw.jpg',
        }}
      />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
