import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import Button from '../../../components/Button';
import useModal from '../../../hooks/useModal';
import MainLayout from '../../../layouts/MainLayout';
import withCheckAuthLayout from '../../../layouts/withCheckAuthLayout';
import WithModalLayout from '../../../layouts/WithModalLayout';
import ConfirmModal from '../../../modals/ConfirmModal';
import { deleteUser, getUserInfo } from '../../../shared/api/organizations';

const ManagerPage = (): JSX.Element => {
	const router = useRouter();

	const toggleShowModal = useModal((state) => state.toggleShowModal);

	const infoMutation = useMutation(getUserInfo);
	const deleteMutation = useMutation(deleteUser);

	useEffect(() => {
		infoMutation.mutate({ id: +router.query.id });
	}, [router]);

	useEffect(() => {
		if(deleteMutation.isSuccess)
			router.push('/lk/users');
	}, [deleteMutation.isSuccess]);

	return (
		<WithModalLayout modal={(
			<ConfirmModal
				title='Подтвердить удаление?'
				onConfirm={() => {
					deleteMutation.mutate({
						id: +router.query.id,
					});
				}} />
		)}
		>
			<MainLayout showFooter={false}>
				<h1 className='font-bold text-3xl mt-4'>
					Информация об аккаунте
					{' '}
					<span className='text-primary'>
						#
						{infoMutation.data && infoMutation.data.owner.id}
					</span>
				</h1>
				<table className='mx-auto mt-12'>
					<tr>
						<td className='pb-3 text-darkGrey'>
							Имя
						</td>
						<td className='font-semibold'>
							{infoMutation.data && infoMutation.data.owner.first_name}
						</td>
					</tr>
					<tr>
						<td className='pb-3 text-darkGrey'>
							Фамили
						</td>
						<td className='font-semibold'>
							{infoMutation.data && infoMutation.data.owner.last_name}
						</td>
					</tr>
					<tr>
						<td className='pr-10 pb-3 text-darkGrey'>
							Имя пользвоателя
						</td>
						<td className='font-semibold'>
							@
							{infoMutation.data && infoMutation.data.owner.username}
						</td>
					</tr>
					<tr>
						<td className='text-darkGrey'>
							Почта
						</td>
						<td className='font-semibold'>
							{infoMutation.data && infoMutation.data.owner.email}
						</td>
					</tr>
				</table>
				<Button
					onClick={toggleShowModal}
					className='md:w-80 mt-6 mx-auto block'
					label='Удалить аккаунт'
					variant='red' />
			</MainLayout>
		</WithModalLayout>
	);
};

export default withCheckAuthLayout(ManagerPage);
