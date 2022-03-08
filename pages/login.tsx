import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import MainLayout from '../layouts/MainLayout';
import withCheckAuthLayout from '../layouts/withCheckAuthLayout';
import Link from 'next/link';
import removeItemFromErrorsList from '../utils/removeItemFromErrorsList';
import { GetStaticProps } from 'next';
import { useMutation } from 'react-query';
import { login } from '../shared/api/auth';

const LoginPage = (): JSX.Element => {
	const router = useRouter();
	const [errorsList, setErrorsList] = useState([]);
	
	const { mutate, data, isError, error, isSuccess } = useMutation(login);

	useEffect(() => {
		if(isSuccess) {
			localStorage.setItem('AUTH_TOKEN', data.token);
			router.push('/lk');
		}
	}, [data, isSuccess, router]);

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
				mutate(values);
		},
	});

	function getErrorMessage() {
		switch((error as any).response.status) {
			case 400:
				return 'Неверный логин или пароль';
			default:
				return 'Ой, что-то пошло не так. Попробуйте ещё раз позже';
		}
	}

	return (
		<>
			<MainLayout showFooter={false} errorMessage={isError && getErrorMessage()}>
				<form onSubmit={formik.handleSubmit} className='lg:w-[375px] mx-auto mt-28 lg:mt-10'>
					<h1 className='font-bold text-lightGrey text-[86px] lg:text-4xl lg:text-center lg:text-black'>
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
						<a className='font-semibold text-sm text-primary float-right lg:mb-5'>
							Забыли пароль?
						</a>
					</Link>
					<Button
						type='submit'
						variant='primary'
						label='Войти'
						className='hidden lg:block' />
					<p className='hidden lg:block mt-5 font-semibold text-sm text-center'>
						Ещё нет аккаунта?
						{' '}
						<Link href='/signup'>
							<a className='text-primary underline'>
								Зарегистрируйтесь
							</a>
						</Link>
					</p>
					<div className='lg:hidden fixed w-full bottom-5 left-0 px-4 text-right'>
						<Button type='submit' variant='primary' label='Войти' />
					</div>
				</form>
			</MainLayout>
		</>
	);
};

export default withCheckAuthLayout(LoginPage, {
	checkNotAuthed: true,
});

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};
