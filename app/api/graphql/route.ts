import { createYoga } from "graphql-yoga";
// TODO: Enable this when going to prod
// import { useCSRFPrevention } from '@graphql-yoga/plugin-csrf-prevention';
// import { useResponseCache } from "@graphql-yoga/plugin-response-cache";
import { schema } from "@graphql/schema";
import { createContext } from "@graphql/context";

const { handleRequest } = createYoga({
  cors: (request: any) => {
    const requestOrigin = request.headers.get("origin");
    return {
      origin: requestOrigin,
      credentials: true,
      allowedHeaders: ["X-Custom-Header"],
      methods: ["POST"],
    };
  },
  plugins: [
    // TODO: Enable this when going to prod
    // useCSRFPrevention({
    //   requestHeaders: ['x-graphql-yoga-csrf'] // default
    // }),
    // useResponseCache({
    //   // global cache
    //   session: () => null,
    // }),
  ],
  schema,
  context: createContext,

  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: `${process.env.NODE_ENV}/api/graphql/`,

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
  logging: "debug",
});

export { handleRequest as GET, handleRequest as POST };
