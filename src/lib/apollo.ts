import { ApolloClient, InMemoryCache } from "@apollo/client";
import { baseUrl } from "@src/configs/baseUrl";

const apolloClient = new ApolloClient({
  uri: `${baseUrl}/api/graphql/`,
  cache: new InMemoryCache(),
});

export default apolloClient;
