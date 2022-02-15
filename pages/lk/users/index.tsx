import { useRouter } from 'next/router';
import MainLayout from '../../../layouts/MainLayout';
import PlusIcon from '../../../assets/plus.svg';
import ManagerCard from '../../../components/ManagerCard';

const UsersPage = (): JSX.Element => {
	const router = useRouter();

	return (
		<MainLayout showFooter={false}>
			<div className='flex justify-between items-center mt-4'>
				<h1 className='font-bold text-4xl'>
					Пользователи
				</h1>
				<button className='rounded-2.5xl p-3 bg-veryLightGrey' onClick={() => router.push('/lk/users/new')}>
					<PlusIcon />
				</button>
			</div>
			<section className='mt-4'>
				<ManagerCard
					isUser
					managerId={12}
					className='mb-5'
					email='isakovsanya56@yandex.ru'
					username='isakov.design'
					password='password123' />
				<ManagerCard
					isUser
					managerId={13}
					className='mb-5'
					email='isakovsanya56@yandex.ru'
					username='isakov.design'
					password='password123' />
			</section>
		</MainLayout>
	);
};

export default UsersPage;
