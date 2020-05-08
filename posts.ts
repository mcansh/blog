// eslint-disable-next-line import/no-unresolved, import/extensions
import { frontMatter as blogPosts } from './pages/**/*.mdx';
import { Post } from './components/post-card';

const posts = ((blogPosts as unknown) as Post[]).sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export { posts };
