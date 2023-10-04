import { createYoga } from "graphql-yoga";
import { useCookies } from "@whatwg-node/server-plugin-cookies";
import { useCSRFPrevention } from "@graphql-yoga/plugin-csrf-prevention";
// import { useResponseCache } from "@graphql-yoga/plugin-response-cache";
import { schema } from "@graphql/schema";
import { createContext } from "@graphql/context";
import { baseUrl } from "@src/configs/baseUrl";

const { handleRequest } = createYoga({
  cors: (request: any) => {
    const requestOrigin = request.headers.get("origin");
    return {
      origin: requestOrigin,
      credentials: true,
      allowedHeaders: ["X-CSRF-Token"],
      methods: ["POST"],
    };
  },
  plugins: [
    useCSRFPrevention({
      requestHeaders: ["X-CSRF-Token"], // default
    }),
    // useResponseCache({
    //   // global cache
    //   session: () => null,
    // }),
    useCookies(),
  ],
  schema,
  context: createContext,

  // While using Next.js file convention for routing, we need to configure Yoga to use the correct endpoint
  graphqlEndpoint: `${baseUrl}/api/graphql/`,

  // Yoga needs to know how to create a valid Next response
  fetchAPI: { Response },
  logging: "debug",
});

export { handleRequest as GET, handleRequest as POST };
