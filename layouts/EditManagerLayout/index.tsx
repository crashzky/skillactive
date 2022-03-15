import { useFormik } from 'formik';
import { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import removeItemFromErrorsList from '../../utils/removeItemFromErrorsList';
import MainLayout from '../MainLayout';
import Props from './EditManagerLayout.props';
import TrashIcon from '../../assets/trash_red.svg';
import LoaderIcon from '../../assets/loader.svg';
import useModal from '../../hooks/useModal';
import WithModalLayout from '../WithModalLayout';
import ConfirmModal from '../../modals/ConfirmModal';

const EditManagerLayout = ({ userId, isLoading, errorMessage, onSubmit, onDelete }: Props): JSX.Element => {
	const [errorsList, setErrorsList] = useState([]);

	const toggleShowModal = useModal((state) => state.toggleShowModal);

	const isNewManager = !userId && userId !== 0;

	const formik = useFormik({
		initialValues: {
			id: userId,
		},
		onSubmit: (values) => {
			let _errorsList = [];

			if(!values.id && values.id !== 0)	
				_errorsList.push('id');

			setErrorsList(_errorsList);
			
			if(!_errorsList.length)
				onSubmit(values);
		},
	});

	function getTitle() {
		if(isNewManager)
			return 'Добавление менеджера';
		else
			return 'Редактирование менеджера';
	}

	return (
		<WithModalLayout modal={(
			<ConfirmModal
				title='Подтвердить удаление менеджера?'
				onConfirm={onDelete} />
		)}
		>
			<MainLayout showFooter={false} errorMessage={errorMessage}>
				<div className='flex justify-between items-center mt-4'>
					<h1 className='font-bold text-3xl'>
						{getTitle()}
					</h1>
					{!isNewManager && (
						<button className='rounded-2xl bg-veryLightGrey p-3' onClick={toggleShowModal}>
							<TrashIcon />
						</button>
					)}
				</div>
				<form onSubmit={formik.handleSubmit} className='mt-5 lg:mt-10 lg:w-[375px] mx-auto'>
					<p className='font-semibold text-sm lg:text-base mb-5'>
						Зарегистрируйте аккаунт пользователя. Его id можно найти в личном кабинете.
					</p>
					<Input
						name='id'
						isDanger={errorsList.includes('id')}
						placeholder='Id аккаунта менеджера'
						value={formik.values.id}
						onChange={(e) => {
							removeItemFromErrorsList(setErrorsList, 'id');
							formik.handleChange(e);
						}} />
					{isLoading ? (
						<LoaderIcon className='h-14 mx-auto mt-7' />
					) : (
						<Button className='mt-7' type='submit' variant='primary' label='Сохранить' />
					)}
				</form>
			</MainLayout>
		</WithModalLayout>
	);
};

export default EditManagerLayout;
