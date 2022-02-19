import { GetStaticProps } from 'next';
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
				<p className='mt-23 font-bold text-2xl lg:w-[521px] lg:text-center mx-auto'>
					Ответьте на несколько вопросов о вашем ребенке, и узнайте какая секция или кружок ему(ей) подойдут
				</p>
				<Button
					className='lg:w-[521px] hidden lg:block mx-auto mt-7'
					onClick={() => {
						setIsActive(true);
						setAnswers([]);
						router.push('/analytics');
					}}
					variant='primary'
					label='Начать' />
			</MainLayout>
			<div className='absolute w-full bottom-5 px-5 lg:hidden'>
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

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};
