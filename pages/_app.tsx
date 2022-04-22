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
import normalizeImageUrl from '../utils/normalizeImgeUrl';

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
						SkillActive - поиск секций и кружков для ребёнка
					</title>
					<link rel='icon' href='/favicon.ico' type='image/x-icon' />
					<meta
						name='description'
						content='SkillActive - сервис поиска кружков и секций для вашего ребёнка.
							Легко находите досуг для всей семьи' />
					<meta property='og:type' content='website' />
					<meta property='og:url' content='https://skillactive.ru/' />
					<meta property='og:title' content='SkillActive - поиск секций и кружков для ребёнка' />
					<meta
						property='og:description'
						content={`SkillActive - сервис поиска кружков и секций для вашего ребёнка.
						Легко находите досуг для всей семьи`} />
					<meta
						property='og:image'
						content={process.env.NEXT_PUBLIC_API_MEDIA_URL
							+ normalizeImageUrl(process.env.NEXT_PUBLIC_DEFAULT_IMAGE_PATH)} />
						
					<meta property='twitter:card' content='summary_large_image' />
					<meta property='twitter:url' content='https://skillactive.ru/' />
					<meta property='twitter:title' content='SkillActive - поиск секций и кружков для ребёнка' />
					<meta
						property='twitter:description'
						content={`SkillActive - сервис поиска кружков и секций для вашего ребёнка.
						Легко находите досуг для всей семьи`} />
					<meta
						property='twitter:image'
						content={process.env.NEXT_PUBLIC_API_MEDIA_URL
							+ normalizeImageUrl(process.env.NEXT_PUBLIC_DEFAULT_IMAGE_PATH)} />
				</Head>
				<Component {...pageProps} />
			</QueryClientProvider>
		);
	}
};

export default MyApp;
