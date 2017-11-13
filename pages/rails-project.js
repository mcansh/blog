import markdown from 'markdown-in-js';
import withOptions from '../components/layouts/withOptions';
import components from '../components';

export default withOptions({
  id: 'rails-project',
})(markdown(components)`
  You're Probably wondering where that Rails project is eh?

  Well... the project has been [done](https://github.com/mcansh/rails-project) for a bit now but I never wrote a post about it.

  Just like my [Sinatra Project](https://mcansh.blog/sinatra-project), I made a CRUD todo app, which allows you to signup for an account with your email or using your GitHub account. After signing up, you can make a new list, make new tasks, edit your list, delete your list, and delete your tasks. If you try accessing a list which you haven't made, you'll be redirected back to the previous page and see an error.
`);
