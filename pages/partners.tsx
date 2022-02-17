import MainLayout from '../layouts/MainLayout';
import GirlAndTimetable from '../assets/images/girl_and_timetable.svg';
import Button from '../components/Button';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';

const PartnersPage = (): JSX.Element => {
	const router = useRouter();
	
	return (
		<>
			<MainLayout showFooter={false}>
				<div className='flex flex-col items-center justify-between lg:flex-row-reverse lg:h-96'>
					<GirlAndTimetable className='lg:scale-150' />
					<div className='mt-5'>
						<p className='font-bold text-xl'>
							Skillactive для партнеров - это
							{' '}
							<br className='hidden lg:block' />
							возможность размещать секции и
							{' '}
							<br className='hidden lg:block' />
							кружки, следить за метриками бизнеса
							{' '}
							<br className='hidden lg:block' />
							и привлекать новую аудиторию
						</p>
						<Button
							variant='primary'
							className='hidden lg:block mt-5'
							label='Я здесь впервые'
							onClick={() => router.push('/signup')} />
						<Button
							className='hidden lg:block mt-3'
							variant='outline'
							label='Войти'
							onClick={() => router.push('/login')} />
					</div>
				</div>
			</MainLayout>
			<div className='fixed bottom-5 w-full px-4 lg:hidden'>
				<Button variant='primary' label='Я здесь впервые' onClick={() => router.push('/signup')} />
				<Button variant='outline' label='Войти' className='mt-3' onClick={() => router.push('/login')} />
			</div>
		</>
	);
};

export default PartnersPage;

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};
