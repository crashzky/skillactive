import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import MainLayout from '../layouts/MainLayout';
import withCheckAuthLayout from '../layouts/withCheckAuthLayout';
import Link from 'next/link';
import removeItemFromErrorsList from '../utils/removeItemFromErrorsList';

const LoginPage = (): JSX.Element => {
	const router = useRouter();
	const [errorsList, setErrorsList] = useState([]);

	const formik = useFormik({
		initialValues: {
			username: '',
			password: '',
		},
		onSubmit: (values) => {
			let _errosList = [];
			if(!values.username)
				_errosList.push('username');
			if(!values.password)
				_errosList.push('password');

			setErrorsList(_errosList);

			if(!_errosList.length)
				router.push('/lk');
		},
	});

	return (
		<>
			<MainLayout showFooter={false}>
				<form onSubmit={formik.handleSubmit}>
					<h1 className='font-bold mt-28 text-lightGrey text-[86px]'>
						Вход
					</h1>
					<Input
						className='mt-6'
						name='username'
						isDanger={errorsList.includes('username')}
						placeholder='Имя пользователя'
						value={formik.values.username}
						onChange={(e) => {
							removeItemFromErrorsList(setErrorsList, 'username');
							formik.handleChange(e);
						}} />
					<Input
						className='mt-5 mb-2.5'
						type='password'
						name='password'
						isDanger={errorsList.includes('password')}
						placeholder='Пароль'
						value={formik.values.password}
						onChange={(e) => {
							removeItemFromErrorsList(setErrorsList, 'password');
							formik.handleChange(e);
						}} />
					<Link href='/reset_password'>
						<a className='font-semibold text-sm text-primary float-right'>
							Забыли пароль?
						</a>
					</Link>
					<div className='fixed w-full bottom-5 left-0 px-4 text-right'>
						<Button type='submit' variant='primary' label='Войти' />
					</div>
				</form>
			</MainLayout>
		</>
	);
};

export default withCheckAuthLayout(LoginPage, {
	checkNotAuthed: false,
});
