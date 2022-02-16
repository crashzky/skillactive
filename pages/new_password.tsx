import { useFormik } from 'formik';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import MainLayout from '../layouts/MainLayout';
import removeItemFromErrorsList from '../utils/removeItemFromErrorsList';

const NewPasswordPage = (): JSX.Element => {
	const router = useRouter();

	const [errorsList, setErrorsList] = useState([]);

	const formik = useFormik({
		initialValues: {
			password: '',
			secondPassword: '',
		},
		onSubmit: (values) => {
			let _errorsList = [];

			if(!values.password)
				_errorsList.push('password');
			if(!values.secondPassword)
				_errorsList.push('secondPassword');
			if(values.password !== values.secondPassword)
				_errorsList.push('repeat');

			setErrorsList(_errorsList);

			if(!_errorsList.length)
				router.push('/login');
		},
	});

	return (
		<MainLayout showFooter={false}>
			<h1 className='font-bold text-4xl mt-14 mb-7'>
				Введите новый пароль
			</h1>
			<form onSubmit={formik.handleSubmit}>
				<Input
					isDanger={errorsList.includes('password')}
					name='password'
					type='password'
					placeholder='Пароль'
					value={formik.values.password}
					onChange={(e) => {
						removeItemFromErrorsList(setErrorsList, 'password');
						formik.handleChange(e);
					}} />
				<Input
					className='mt-5'
					isDanger={errorsList.includes('secondPassword')}
					name='secondPassword'
					type='password'
					placeholder='Повторите пароль'
					value={formik.values.secondPassword}
					onChange={(e) => {
						removeItemFromErrorsList(setErrorsList, 'secondPassword');
						formik.handleChange(e);
					}} />
				{errorsList.includes('repeat') && (
					<p className='font-semibold text-sm text-center text-red mt-5'>
						Пароли не совпадают
					</p>
				)}
				<div className='fixed bottom-5 left-0 w-full px-4'>
					<Button variant='primary' type='submit' label='Восстановить' />
				</div>
			</form>
		</MainLayout>
	);
};

export default NewPasswordPage;

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};
