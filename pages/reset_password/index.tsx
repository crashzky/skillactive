import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import MainLayout from '../../layouts/MainLayout';
import removeItemFromErrorsList from '../../utils/removeItemFromErrorsList';

const ResetPasswordPage = (): JSX.Element => {
	const router = useRouter();

	const [errorsList, setErrorsList] = useState([]);

	const formik = useFormik({
		initialValues: {
			email: '',
		},
		onSubmit: (values) => {
			let _errorsList = errorsList;

			if(!values.email)
				_errorsList.push('email');

			setErrorsList(_errorsList);

			if(!errorsList.length)
				router.push('/reset_password/after');
		},
	});

	return (
		<MainLayout showFooter={false}>
			<h1 className='font-bold text-4xl mt-14 mb-7'>
				Востановление пароля
			</h1>
			<form onSubmit={formik.handleSubmit}>
				<Input
					isDanger={errorsList.includes('email')}
					name='email'
					type='email'
					placeholder='Email, указанный при регистрации'
					value={formik.values.email}
					onChange={(e) => {
						removeItemFromErrorsList(setErrorsList, 'email');
						formik.handleChange(e);
					}} />
				<div className='fixed bottom-5 left-0 w-full px-4'>
					<Button variant='primary' type='submit' label='Отправить ссылку на восстановление' />
				</div>
			</form>
		</MainLayout>
	);
};

export default ResetPasswordPage;
