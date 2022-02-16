import { useFormik } from 'formik';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import MainLayout from '../../layouts/MainLayout';
import withCheckAuthLayout from '../../layouts/withCheckAuthLayout';
import removeItemFromErrorsList from '../../utils/removeItemFromErrorsList';

const SettingsPage = (): JSX.Element => {
	const router = useRouter();
	const [errorsList, setErrorsList] = useState([]);

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
		},
		onSubmit: (values) => {
			let _errorsList = [];

			if(!values.email)
				_errorsList.push('email');
			if(!values.password)
				_errorsList.push('password');

			setErrorsList(_errorsList);

			if(!_errorsList.length)
				router.push('/lk');
		},
	});

	return (
		<MainLayout showFooter={false}>
			<h1 className='font-bold text-3xl mt-4'>
				Настройки
			</h1>
			<form onSubmit={formik.handleSubmit}>
				<Input 
					className='mt-5'
					type='email'
					placeholder='Email'
					name='email'
					isDanger={errorsList.includes('email')}
					onChange={(e) => {
						removeItemFromErrorsList(setErrorsList, 'email');
						formik.handleChange(e);
					}}
					value={formik.values.email} />
				<Input 
					className='my-5'
					type='password'
					name='password'
					placeholder='Пароль' 
					isDanger={errorsList.includes('password')}
					onChange={(e) => {
						removeItemFromErrorsList(setErrorsList, 'password');
						formik.handleChange(e);
					}}
					value={formik.values.password} />
				<Button type='submit' variant='primary' label='Сохранить' />
			</form>
		</MainLayout>
	);
};

export default withCheckAuthLayout(SettingsPage);

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};

