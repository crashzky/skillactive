import { useFormik } from 'formik';
import { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import removeItemFromErrorsList from '../../utils/removeItemFromErrorsList';
import MainLayout from '../MainLayout';
import Props from './EditManagerLayout.props';
import TrashIcon from '../../assets/trash_red.svg';
import InputSelect from '../../components/InputSelect';

const EditManagerLayout = ({ email = '', password = '', username = '', isUser, onSubmit, 
	onDelete, userType }: Props): JSX.Element => {
	const [errorsList, setErrorsList] = useState([]);
	const [userTypeValue, setUserTypeValue] = useState(userType && { value: userType, label: userType });

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
			if(!userTypeValue)
				_errorsList.push('userType');

			setErrorsList(_errorsList);
			
			if(!_errorsList.length)
				onSubmit(values);
		},
	});

	function getTitle() {
		if(isUser && isNewManager)
			return 'Добавление пользователя';
		else if(isUser)
			return 'Редактирование пользователя';
		else if(isNewManager)
			return 'Добавление менеджера';
		else
			return 'Редактирование менеджера';
	}

	return (
		<MainLayout showFooter={false}>
			<div className='flex justify-between items-center mt-4'>
				<h1 className='font-bold text-3xl'>
					{getTitle()}
				</h1>
				{!isNewManager && (
					<button className='rounded-2xl bg-veryLightGrey p-3' onClick={onDelete}>
						<TrashIcon />
					</button>
				)}
			</div>
			<form onSubmit={formik.handleSubmit} className='mt-5 lg:mt-10 lg:w-[375px] mx-auto'>
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
				<InputSelect
					className='my-5'
					placeholder='Тип пользователя'
					value={userTypeValue}
					onChange={(value) => {
						removeItemFromErrorsList(setErrorsList, 'userType');
						setUserTypeValue(value as any);
					}}
					options={[
						{ label: 'Администратор', value: 'Администратор' },
						{ label: 'Партнёр', value: 'Партнёр' },
					]} />
				{errorsList.includes('userType') && (
					<p className='text-red font-semibold text-center mt-4'>
						Выберите тип пользователя
					</p>
				)}
				<Button className='mt-7' type='submit' variant='primary' label='Сохранить' />
			</form>
		</MainLayout>
	);
};

export default EditManagerLayout;
