import Head from 'next/head';
import { AppProps } from 'next/app';

import '../styles/globals.css';
import '../styles/font.css';
import '../styles/custom.css';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
	return (
		<>
			<Head>
				<title>
					Skillactive - поиск секций и кружков для ребёнка
				</title>
			</Head>
			<Component {...pageProps} />
		</>
	);
};

export default MyApp;
