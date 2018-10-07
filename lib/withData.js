import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { LOCAL_STATE_QUERY } from '../components/Navigation';

function createClient({ headers, initialState }) {
  return new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache().restore(initialState || {}),
    request: operation => {
      operation.setContext({
        headers: {
          authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          ...headers,
        },
      });
    },
    clientState: {
      resolvers: {
        Mutation: {
          toggleNav(_, variables, { cache }) {
            const { open } = variables;

            // read the navOpen value from the cache
            const { navOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY,
            });
            // Write the nav state to the opposite
            const data = {
              data: { navOpen: open || !navOpen },
            };
            cache.writeData(data);
            return data;
          },
        },
      },
      defaults: {
        navOpen: false,
      },
    },
  });
}

export default withApollo(createClient);
