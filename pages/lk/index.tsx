import MainLayout from '../../layouts/MainLayout';
import ExitIcon from '../../assets/exit.svg';
import withCheckAuthLayout from '../../layouts/withCheckAuthLayout';
import Button from '../../components/Button';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';
import { useQuery } from 'react-query';
import { checkStaff } from '../../shared/api/auth';
import WithModalLayout from '../../layouts/WithModalLayout';
import useModal from '../../hooks/useModal';
import ConfirmModal from '../../modals/ConfirmModal';

const LKPage = (): JSX.Element => {
	const router = useRouter();

	const { isSuccess } = useQuery('check_staff', checkStaff);

	const toggleShowModal = useModal((state) => state.toggleShowModal);

	const onExitClick = () => {
		localStorage.removeItem('AUTH_TOKEN');
		router.push('/lk/settings');
	};

	return (
		<WithModalLayout modal={(
			<ConfirmModal
				title='Подтвердить выход из аккаунта?'
				onConfirm={onExitClick} />
		)}
		>
			<MainLayout showFooter={false}>
				<div className='flex justify-between items-center mt-4'>
					<h1 className='font-bold text-3xl'>
						Личный кабинет
					</h1>
					<button className='p-3 bg-veryLightGrey rounded-2xl' onClick={toggleShowModal}>
						<ExitIcon />
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
					{isSuccess && (
						<>
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
						</>
					)}
				</div>
			</MainLayout>
		</WithModalLayout>
	);
};

export default withCheckAuthLayout(LKPage);

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};
