import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import useContest from '../../hooks/useContest';
import ContestHeader from '../../components/ContestHeader';
import ANALYTICS_CONTEST from '../../shared/consts/contestQuestions';
import Button from '../../components/Button';

const AnalyticsPage = (): JSX.Element => {
	const router = useRouter();
	const isActive = useContest((state) => state.isActive);
	const answers = useContest((state) => state.answers);
	const setAnswers = useContest((state) => state.setAnswers);

	const [currentAnswer, setCurrentAnswer] = useState(null);

	useEffect(() => {
		if(!isActive)
			router.push('/analytics/preview');
	}, [router, isActive]);

	useEffect(() => {
		if(answers.length === ANALYTICS_CONTEST.length)
			router.push('/analytics/result');
	}, [router, answers]);

	return (
		<>
			<ContestHeader className='mt-8 px-4' />
			<main className='px-4'>
				<p className='mt-25 font-bold text-2xl'> 
					{ANALYTICS_CONTEST[answers.length] && ANALYTICS_CONTEST[answers.length].label}
				</p>
				<div className='mt-10'>
					{ANALYTICS_CONTEST[answers.length] && ANALYTICS_CONTEST[answers.length].answers.map((i, num) => (
						<Button
							key={num}
							variant={currentAnswer === num ? 'primary' : 'veryLightGrey'}
							className='mb-5 transition-all duration-200'
							onClick={() => setCurrentAnswer(num)}
							label={i} />
					))}
				</div>
			</main>
			<div className='absolute bottom-5 w-full px-4'>
				<Button
					className={!currentAnswer && currentAnswer !== 0 ? 'opacity-0' : 'transition-all duration-200'}
					variant='primary'
					label='Далее'
					onClick={() => {
						if(currentAnswer || currentAnswer === 0) {
							setAnswers([...answers, currentAnswer]);
							setCurrentAnswer(null);
						}
					}} />
			</div>
		</>
	);
};

export default AnalyticsPage;
