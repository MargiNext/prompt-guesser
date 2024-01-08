// src/pages/_app.tsx
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from './store';
import RootLayout from './layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <p>hogehoge</p>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </Provider>
  );
}

export default MyApp;
