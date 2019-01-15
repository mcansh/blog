import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { LOCAL_STATE_QUERY } from '../components/Navigation';

function createClient({ headers, initialState }) {
  const token = String(process.env.GITHUB_TOKEN);

  return new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache().restore(initialState || {}),
    request: operation => {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`,
          ...headers,
        },
      });
    },
    clientState: {
      resolvers: {
        Mutation: {
          closeNav(_, variables, { cache }) {
            const data = {
              data: { navOpen: false },
            };
            cache.writeData(data);
            return data;
          },
          toggleNav(_, variables, { cache }) {
            // read the navOpen value from the cache
            const { navOpen } = cache.readQuery({
              query: LOCAL_STATE_QUERY,
            });
            // Write the nav state to the opposite
            const data = {
              data: { navOpen: !navOpen },
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
