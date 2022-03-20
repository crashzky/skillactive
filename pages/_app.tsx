import Head from 'next/head';
import { AppProps } from 'next/app';
import Router from 'next/router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { useState } from 'react';
import Lottie from 'react-lottie';

import '../styles/globals.css';
import '../styles/font.css';
import '../styles/custom.css';
import '../styles/checkbox.css';
import * as animationData from '../assets/animation.json';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
	const queryClient = new QueryClient();

	const [animationStart, setAnimationStart] = useState(false);

	Router.events.on('routeChangeStart', () => setAnimationStart(true));
	Router.events.on('routeChangeComplete', () => setAnimationStart(false));

	const defaultOptions = {
		loop: true,
		autoplay: true, 
		animationData: animationData,
	};
 
	if(animationStart) {
		return (
			<div className='w-screen h-screen flex justify-center items-center'>
				<Lottie
					options={defaultOptions}
					height={130}
					width={130}
					isStopped={false}
					isPaused={false} />
			</div>
		);
	}
	else {
		return (
			<QueryClientProvider client={queryClient}>
				<Head>
					<title>
						Skillactive - поиск секций и кружков для ребёнка
					</title>
				</Head>
				<Component {...pageProps} />
			</QueryClientProvider>
		);
	}
};

export default MyApp;
