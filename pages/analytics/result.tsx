import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from '../../components/Button';
import ContestHeader from '../../components/ContestHeader';
import useContest from '../../hooks/useContest';
import useModal from '../../hooks/useModal';
import MainLayout from '../../layouts/MainLayout';
import ANALYTICS_CONTEST from '../../shared/consts/contestQuestions';

const ResultPage = (): JSX.Element => {
	const router = useRouter();
	const answers = useContest((state) => state.answers);
	const toggleShowMenu = useModal((state) => state.toggleShowMenu);

	const [windowWidth, setWindowWidth] = useState(0);

	useEffect(() => {
		if(answers.length !== ANALYTICS_CONTEST.length)
			router.push('/analytics');

		setWindowWidth(window.innerWidth);
	}, [router, answers]);

	return (
		<>
			<MainLayout showHeader={windowWidth > 1024} showFooter={false}>
				<ContestHeader className='mt-8 px-4 lg:w-[345px] mx-auto' />
				<main className='px-4'>
					<p className='mt-25 font-bold text-2xl lg:text-center'>
						Ваш ребенок – соперник, бросающий вызов
					</p>
					<p className='mt-5 font-semibold text-lg'>
						Вашему ребенку больше подойдут одиночные виды спорта.
						Велоезда, плавание, легкая атлетика – это те занятия,
						которые будут активизировать его силу характера,
						волю и готовность преодолевать трудности, бросать
						себе вызов и добиваться результата. 
					</p>
					<Button
						className='my-5 w-[375px] hidden lg:block mx-auto'
						variant='primary'
						label='Посмотреть занятия'
						onClick={() => {
							toggleShowMenu();
							router.push('/');
						}} />
					<Button
						className='w-[375px] hidden lg:block mx-auto'
						variant='outline'
						label='На главную'
						onClick={() => router.push('/')} />
				</main>
			</MainLayout>
			<div className='absolute bottom-5 w-full px-4 lg:hidden'>
				<Button
					className='mb-5'
					variant='primary'
					label='Посмотреть занятия'
					onClick={() => {
						toggleShowMenu();
						router.push('/');
					}} />
				<Button
					variant='outline'
					label='На главную'
					onClick={() => router.push('/')} />
			</div>
		</>
	);
};

export default ResultPage;

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};
