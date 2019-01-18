import withApollo from 'next-with-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';

function createClient({ headers, initialState }) {
  const token = String(process.env.GITHUB_TOKEN);

  return new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache().restore(initialState || {}),
    // @ts-ignore
    request: operation => {
      operation.setContext({
        headers: {
          authorization: `Bearer ${token}`,
          ...headers,
        },
      });
    },
  });
}

export default withApollo(createClient);
