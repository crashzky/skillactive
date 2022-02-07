import { AppProps } from 'next/app';

import '../styles/globals.css';
import '../styles/font.css';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
	return <Component {...pageProps} />;
};

export default MyApp;
