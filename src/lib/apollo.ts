import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: `${process.env.NODE_ENV}/api/graphql/`,
  cache: new InMemoryCache(),
});

export default apolloClient;
