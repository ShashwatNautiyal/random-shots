import {
    ApolloClient,
    InMemoryCache,
} from '@apollo/client';

const client = new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://random-shots-server.herokuapp.com//"
      : "http://localhost:4000/",
  cache: new InMemoryCache(),
  ssrMode: true
});

export default client;
