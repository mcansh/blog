/* eslint-env jest */
import { shallow } from 'enzyme';
import React from 'react';
// import renderer from 'react-test-renderer';

import App from '../pages/index';
import Header from '../components/Header';

describe('With Enzyme', () => {
  it('App renders', () => {
    const app = shallow(<App />);

    expect(app.find(Header)).toHaveLength(1);
  });
});

// describe('With Snapshot Testing', () => {
//   it('App shows "Hello world!"', () => {
//     const component = renderer.create(<App />);
//     const tree = component.toJSON();
//     expect(tree).toMatchSnapshot();
//   });
// });
