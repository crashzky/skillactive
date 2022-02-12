import MainLayout from '../layouts/MainLayout';
import GirlAndTimetable from '../assets/images/girl_and_timetable.svg';
import Button from '../components/Button';
import { useRouter } from 'next/router';

const PartnersPage = (): JSX.Element => {
	const router = useRouter();
	
	return (
		<>
			<MainLayout showFooter={false}>
				<GirlAndTimetable />
				<p className='font-bold text-xl mt-5'>
					Skillactive для партнеров - это возможность размещать
					секции и кружки, следить за метриками бизнеса и привлекать новую аудиторию
				</p>
			</MainLayout>
			<div className='fixed bottom-5 w-full px-4'>
				<Button variant='primary' label='Я здесь впервые' onClick={() => router.push('/signup')} />
				<Button variant='outline' label='Войти' className='mt-3' onClick={() => router.push('/login')} />
			</div>
		</>
	);
};

export default PartnersPage;
