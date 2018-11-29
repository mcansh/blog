/* eslint-env jest */
import React from 'react';
import 'jest-styled-components';
import Router from 'next/router';
import { render, cleanup } from 'react-testing-library';
import Post from '../../components/Post';

afterEach(cleanup);

const mockedRouter = { push: () => {}, prefetch: () => {} };
Router.router = mockedRouter;

const post = {
  id: 'html5-progress-element',
  title: 'The HTML5 progress element',
  date: 1476403200000,
  image: {
    imageUrl: 'matthew-kane-146076.jpg',
    name: 'Matthew Kane',
    url: 'https://unsplash.com/photos/9EM7s13H2I0',
  },
};

const postWithoutUnsplash = {
  id: 'rails-project',
  title: 'Rails project',
  date: 1503633600000,
  image: {
    imageUrl: '1_Wmv8hfi_bTHuHyV5CawnCw.jpg',
  },
};

describe('<Post />', () => {
  it('Renders a Post', () => {
    const { getByTestId } = render(
      <Post
        image={post.image}
        date={post.date}
        title={post.title}
        id={post.id}
      />
    );

    const title = getByTestId('post__title');
    const link = getByTestId('post__link');
    const image = getByTestId('post__image');
    const date = getByTestId('post__date');

    expect(title.textContent).toBe('The HTML5 progress element');
    expect(link.href).toBe('http://localhost:3000/html5-progress-element');
    expect(date.textContent).toBe('October 13, 2016');
    expect(image.dataset.imageUrl).toBe(
      'https://unsplash.com/photos/9EM7s13H2I0?utm_source=unsplash&utm_medium=referral&utm_content=mcansh_blog'
    );
    expect(image.src).toBe(
      'https://res.cloudinary.com/dof0zryca/image/upload/f_auto,h_200/v1541889199/blog/matthew-kane-146076.jpg'
    );
    expect(image.srcset).toBe(
      'https://res.cloudinary.com/dof0zryca/image/upload/f_auto,h_200/v1541889199/blog/matthew-kane-146076.jpg 1x, https://res.cloudinary.com/dof0zryca/image/upload/f_auto,h_400/v1541889199/blog/matthew-kane-146076.jpg 2x, https://res.cloudinary.com/dof0zryca/image/upload/f_auto,h_600/v1541889199/blog/matthew-kane-146076.jpg 3x'
    );
  });

  it('Renders a Post without data-image-url', () => {
    const { getByTestId } = render(
      <Post
        image={postWithoutUnsplash.image}
        date={post.date}
        title={postWithoutUnsplash.title}
        id={postWithoutUnsplash.id}
      />
    );

    const title = getByTestId('post__title');
    const link = getByTestId('post__link');
    const image = getByTestId('post__image');
    const date = getByTestId('post__date');

    expect(title.textContent).toBe('Rails project');
    expect(link.href).toBe('http://localhost:3000/rails-project');
    expect(date.textContent).toBe('October 13, 2016');
    expect(image.dataset.imageUrl).toBe(undefined);
    expect(image.dataset.imageUrl).not.toBe('literally anything else');
    expect(image.src).toBe(
      'https://res.cloudinary.com/dof0zryca/image/upload/f_auto,h_200/v1541889199/blog/1_Wmv8hfi_bTHuHyV5CawnCw.jpg'
    );
    expect(image.srcset).toBe(
      'https://res.cloudinary.com/dof0zryca/image/upload/f_auto,h_200/v1541889199/blog/1_Wmv8hfi_bTHuHyV5CawnCw.jpg 1x, https://res.cloudinary.com/dof0zryca/image/upload/f_auto,h_400/v1541889199/blog/1_Wmv8hfi_bTHuHyV5CawnCw.jpg 2x, https://res.cloudinary.com/dof0zryca/image/upload/f_auto,h_600/v1541889199/blog/1_Wmv8hfi_bTHuHyV5CawnCw.jpg 3x'
    );
  });
});
