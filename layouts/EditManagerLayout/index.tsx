import { useFormik } from 'formik';
import { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import removeItemFromErrorsList from '../../utils/removeItemFromErrorsList';
import MainLayout from '../MainLayout';
import Props from './EditManagerLayout.props';
import TrashIcon from '../../assets/trash_red.svg';

const EditManagerLayout = ({ email = '', password = '', username = '', onSubmit, onDelete }: Props): JSX.Element => {
	const [errorsList, setErrorsList] = useState([]);

	const isNewManager = !email && !password && !username;

	const formik = useFormik({
		initialValues: {
			email,
			password,
			username,
		},
		onSubmit: (values) => {
			let _errorsList = [];

			if(!values.email)	
				_errorsList.push('email');
			if(!values.password)
				_errorsList.push('password');
			if(!values.username)
				_errorsList.push('username');

			setErrorsList(_errorsList);
			
			if(!_errorsList.length)
				onSubmit(values);
		},
	});

	return (
		<MainLayout showFooter={false}>
			<div className='flex justify-between items-center mt-4'>
				<h1 className='font-bold text-3xl'>
					{isNewManager ? 'Добавление менеджера' : 'Редактирование менеджера'}
				</h1>
				{!isNewManager && (
					<button className='rounded-2xl bg-veryLightGrey p-3' onClick={onDelete}>
						<TrashIcon />
					</button>
				)}
			</div>
			<form onSubmit={formik.handleSubmit} className='mt-5'>
				<Input
					name='username'
					isDanger={errorsList.includes('username')}
					placeholder='Имя пользователя'
					value={formik.values.username}
					onChange={(e) => {
						removeItemFromErrorsList(setErrorsList, 'username');
						formik.handleChange(e);
					}} />
				<Input
					className='mt-5'
					type='email'
					name='email'
					isDanger={errorsList.includes('email')}
					placeholder='Email'
					value={formik.values.email}
					onChange={(e) => {
						removeItemFromErrorsList(setErrorsList, 'email');
						formik.handleChange(e);
					}} />
				<Input
					className='mt-5'
					type='password'
					name='password'
					placeholder='Пароль'
					isDanger={errorsList.includes('password')}
					value={formik.values.password}
					onChange={(e) => {
						removeItemFromErrorsList(setErrorsList, 'password');
						formik.handleChange(e);
					}} />
				<Button className='mt-7' type='submit' variant='primary' label='Сохранить' />
			</form>
		</MainLayout>
	);
};

export default EditManagerLayout;
