import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { ApolloProvider } from '@apollo/client';

import client from '../src/apollo';
import Layout from '../src/common/Layout';
import Navbar from '../src/common/Navbar';
import store from '../src/store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <Layout>
            <Navbar />
            <Component {...pageProps} />
          </Layout>
        </Provider>
      </ApolloProvider>
    </>
  );
}

export default MyApp;
