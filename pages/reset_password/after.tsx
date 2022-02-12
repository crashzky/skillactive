import MainLayout from '../../layouts/MainLayout';
import GirlAndLaptopImage from '../../assets/images/girl_and_laptop.svg';
import Button from '../../components/Button';
import { useRouter } from 'next/router';

const AfterResetPassword = (): JSX.Element => {
	const router = useRouter();

	return (
		<>
			<MainLayout showFooter={false}>
				<GirlAndLaptopImage className='mt-8 mx-auto' />
				<p className='font-bold text-xl mt-5'>
					Проверьте свою почту. Мы направили вам ссылку для восстановления
				</p>
			</MainLayout>
			<div className='fixed bottom-5 w-full px-4'>
				<Button variant='primary' label='Вернуться на главную' onClick={() => router.push('/')} />
			</div>
		</>
	);
};

export default AfterResetPassword;
