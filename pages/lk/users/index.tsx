import { useRouter } from 'next/router';
import MainLayout from '../../../layouts/MainLayout';
import PlusIcon from '../../../assets/plus.svg';
import ManagerCard from '../../../components/ManagerCard';
import withCheckAuthLayout from '../../../layouts/withCheckAuthLayout';
import { GetStaticProps } from 'next';

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
			<section className='mt-4 lg:flex flex-wrap gap-2.5'>
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

export default withCheckAuthLayout(UsersPage);

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};
