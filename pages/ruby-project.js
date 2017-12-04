import markdown from 'markdown-in-js';
import withOptions from '../components/layouts/withOptions';
import components from '../components';

export default withOptions({
  id: 'ruby-project',
})(markdown(components)`
`);
