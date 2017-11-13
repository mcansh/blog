import markdown from 'markdown-in-js';
// import javascript from 'highlight.js/lib/languages/javascript';
import withOptions from '../components/layouts/withOptions';
import components from '../components';
// import { Code } from '../components/Code';

export default withOptions({
  id: 'rails-javascript-project',
})(markdown(components)`
`);
