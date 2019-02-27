// @ts-ignore
import { meta as learningSoftwareDevelopment } from './pages/why-im-learning-software-development.mdx';
// @ts-ignore
import { meta as html5Progress } from './pages/html5-progress-element.mdx';
// @ts-ignore
import { meta as objectLifecycle } from './pages/object-lifecycle-cheatsheet.mdx';
// @ts-ignore
import { meta as javascriptlasses } from './pages/javascript-classes.mdx';
// @ts-ignore
import { meta as rackKeyConcepts } from './pages/rack-key-concepts.mdx';
// @ts-ignore
import { meta as lifeAndCode } from './pages/similarities-between-life-and-code.mdx';
// @ts-ignore
import { meta as timeToHex } from './pages/time-to-hex.mdx';
// @ts-ignore
import { meta as sinatraProject } from './pages/sinatra-project.mdx';
// @ts-ignore
import { meta as railsProject } from './pages/rails-project.mdx';
// @ts-ignore
import { meta as rubyProject } from './pages/ruby-project.mdx';
import { Post } from '~/components/post-card/index.tsx';

const posts = [
  learningSoftwareDevelopment,
  html5Progress,
  objectLifecycle,
  javascriptlasses,
  rackKeyConcepts,
  lifeAndCode,
  timeToHex,
  sinatraProject,
  railsProject,
  rubyProject,
];

const sortPosts = (postsArray: Post[]) =>
  postsArray.sort((a, b) => {
    if (a.date > b.date) return -1;
    if (a.date < b.date) return 1;
    return 0;
  });

const sortedByDate = sortPosts(posts);

export { sortPosts, sortedByDate };
export default posts;
