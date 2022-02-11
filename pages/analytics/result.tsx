import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Button from '../../components/Button';
import ContestHeader from '../../components/ContestHeader';
import useContest from '../../hooks/useContest';
import useModal from '../../hooks/useModal';
import ANALYTICS_CONTEST from '../../shared/consts/contestQuestions';

const ResultPage = (): JSX.Element => {
	const router = useRouter();
	const answers = useContest((state) => state.answers);
	const toggleShowMenu = useModal((state) => state.toggleShowMenu);

	useEffect(() => {
		if(answers.length !== ANALYTICS_CONTEST.length)
			router.push('/analytics');
	}, [router, answers]);

	return (
		<>
			<ContestHeader className='mt-8 px-4' />
			<main className='px-4'>
				<p className='mt-25 font-bold text-2xl'>
					Ваш ребенок – соперник, бросающий вызов
				</p>
				<p className='mt-5 font-semibold text-lg'>
					Вашему ребенку больше подойдут одиночные виды спорта.
					Велоезда, плавание, легкая атлетика – это те занятия,
					которые будут активизировать его силу характера,
					волю и готовность преодолевать трудности, бросать
					себе вызов и добиваться результата. 
				</p>
			</main>
			<div className='absolute bottom-5 w-full px-4'>
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
