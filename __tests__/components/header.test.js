/* eslint-env jest */
import { shallow } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import createComponentWithIntl from '../../utils/jest';

import Header, { Title } from '../../components/Header';
import posts from '../../posts.json';

const [latest] = posts;

describe('Header Component', () => {
  it('shows latest post', () => {
    const header = shallow(<Header id={latest.id} link={latest.id} />);
    expect(
      header
        .find(Title)
        .render()
        .text()
    ).toBe(latest.title);
  });

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
  it('shows latest post', () => {
    const component = createComponentWithIntl(<Header id={latest.id} />);

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

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
