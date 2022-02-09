import { useRouter } from 'next/router';
import Button from '../../components/Button';
import useContest from '../../hooks/useContest';
import MainLayout from '../../layouts/MainLayout';

const PreviewPage = (): JSX.Element => {
	const router = useRouter();
	const setIsActive = useContest((state) => state.setIsActive);
	const setAnswers = useContest((state) => state.setAnswers);

	return (
		<>
			<MainLayout showFooter={false}>
				<p className='mt-23 font-bold text-2xl'>
					Ответьте на несколько вопросов о вашем ребенке, и узнайте какая секция или кружок ему(ей) подойдут
				</p>
			</MainLayout>
			<div className='absolute w-full bottom-5 px-5'>
				<Button
					onClick={() => {
						setIsActive(true);
						setAnswers([]);
						router.push('/analytics');
					}}
					variant='primary'
					label='Начать' />
			</div>
		</>
	);
};

export default PreviewPage;
