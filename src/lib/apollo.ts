import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import csrf from "csrf";
import { setContext } from "@apollo/client/link/context";
import { APP_SECRET } from "@graphql/utils/auth";
import { baseUrl } from "@src/configs/baseUrl";

const tokens = new csrf();

const httpLink = createHttpLink({
  uri: `${baseUrl}/api/graphql/`,
  credentials: "include",
});

const authLink = setContext((_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      "X-CSRF-Token": tokens.create(APP_SECRET),
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;
