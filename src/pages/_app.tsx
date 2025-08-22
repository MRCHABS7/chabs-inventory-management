import type { AppProps } from 'next/app';
// Changed the import to a relative path.
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}