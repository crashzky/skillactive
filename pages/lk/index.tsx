import MainLayout from '../../layouts/MainLayout';
import SettingsIcon from '../../assets/settings.svg';
import withCheckAuthLayout from '../../layouts/withCheckAuthLayout';
import Button from '../../components/Button';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';

const LKPage = (): JSX.Element => {
	const router = useRouter();

	return (
		<MainLayout showFooter={false}>
			<div className='flex justify-between items-center mt-4'>
				<h1 className='font-bold text-3xl'>
					Личный кабинет
				</h1>
				<button className='p-3 bg-veryLightGrey rounded-2xl' onClick={() => router.push('/lk/settings')}>
					<SettingsIcon />
				</button>
			</div>
			<div className='lg:w-[375px] lg:mt-10 mx-auto'>
				<Button
					variant='veryLightGrey'
					className='mt-5 text-black'
					label='Мои занятия'
					onClick={() => router.push('/lk/sections')} />
				<Button
					variant='veryLightGrey'
					className='mt-5 text-black'
					label='Менеджеры'
					onClick={() => router.push('/lk/managers')} />
				<Button
					variant='veryLightGrey'
					className='mt-5 text-black'
					label='Заявки'
					onClick={() => router.push('/lk/requests')} />
				<Button
					variant='veryLightGrey'
					className='mt-5 text-black'
					label='Все пользователи'
					onClick={() => router.push('/lk/users')} />
				<Button
					variant='veryLightGrey'
					className='mt-5 text-black'
					label='Статьи'
					onClick={() => router.push('/lk/articles')} />
			</div>
		</MainLayout>
	);
};

export default withCheckAuthLayout(LKPage);

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};