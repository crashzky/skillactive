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
import { register } from '../shared/api/auth';
import LoaderIcon from '../assets/loader.svg';

const LoginPage = (): JSX.Element => {
	const router = useRouter();
	const [errorsList, setErrorsList] = useState([]);

	const { mutate, isError, isLoading, error, isSuccess } = useMutation(register);

	useEffect(() => {
		if(isSuccess)
			router.push('/login');
	}, [isSuccess, router]);

	const formik = useFormik({
		initialValues: {
			email: '',
			username: '',
			password: '',
			first_name: '',
			last_name: '',
		},
		onSubmit: (values) => {
			let _errosList = [];
			if(!values.username)
				_errosList.push('username');
			if(!values.password)
				_errosList.push('password');
			if(!values.email)
				_errosList.push('email');
			if(!values.first_name)
				_errosList.push('first_name');
			if(!values.last_name)
				_errosList.push('last_name');

			setErrorsList(_errosList);

			if(!_errosList.length)
				mutate(values);
		},
	});

	function getErrorMessage() {
		switch((error as any).response.status) {
			case 400:
				return 'Пользователь с таким никнэймом или почтой уже существует';
			default:
				return 'Ой, что-то пошло не так. Попробуйте ещё раз позже';
		}
	}

	return (
		<>
			<MainLayout showFooter={false} errorMessage={isError && getErrorMessage()}>
				<form onSubmit={formik.handleSubmit} className='lg:w-[375px] mx-auto mt-28 lg:mt-10'>
					<h1
						className={`
							font-bold mt-10 leading-none text-lightGrey text-[86px] lg:text-4xl lg:text-center lg:text-black`}
					>
						Регист
						<br className='lg:hidden' />
						рация
					</h1>
					<Input
						className='mt-6'
						name='first_name'
						isDanger={errorsList.includes('first_name')}
						placeholder='Имя'
						value={formik.values.first_name}
						onChange={(e) => {
							removeItemFromErrorsList(setErrorsList, 'first_name');
							formik.handleChange(e);
						}} />
					<Input
						className='mt-6'
						name='last_name'
						isDanger={errorsList.includes('last_name')}
						placeholder='Фамилия'
						value={formik.values.last_name}
						onChange={(e) => {
							removeItemFromErrorsList(setErrorsList, 'last_name');
							formik.handleChange(e);
						}} />
					<Input
						className='mt-6'
						name='email'
						type='email'
						isDanger={errorsList.includes('email')}
						placeholder='Email для связи'
						value={formik.values.email}
						onChange={(e) => {
							removeItemFromErrorsList(setErrorsList, 'email');
							formik.handleChange(e);
						}} />
					<Input
						className='mt-6'
						name='username'
						isDanger={errorsList.includes('username')}
						placeholder='Никнэйм'
						value={formik.values.username}
						onChange={(e) => {
							removeItemFromErrorsList(setErrorsList, 'username');
							formik.handleChange(e);
						}} />
					<Input
						className='mt-5 mb-2.5 lg:mb-5'
						type='password'
						name='password'
						isDanger={errorsList.includes('password')}
						placeholder='Пароль'
						value={formik.values.password}
						onChange={(e) => {
							removeItemFromErrorsList(setErrorsList, 'password');
							formik.handleChange(e);
						}} />
					{isLoading ? (
						<LoaderIcon className='h-16 ml-36 hidden lg:block' />
					) : (
						<Button
							type='submit'
							variant='primary'
							label='Зарегистрироваться'
							className='hidden lg:block' />
					)}
					<p className='hidden lg:block mt-5 font-semibold text-sm text-center'>
						Уже есть аккаунт?
						{' '}
						<Link href='/login'>
							<a className='text-primary underline'>
								Войдите
							</a>
						</Link>
					</p>
					{isLoading ? (
						<LoaderIcon className='h-16 ml-36 mt-4 lg:hidden' />
					) : (
						<div className='fixed w-full bottom-5 left-0 px-4 text-right lg:hidden'>
							<Button type='submit' variant='primary' label='Зарегистрироваться' />
						</div>
					)}
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

