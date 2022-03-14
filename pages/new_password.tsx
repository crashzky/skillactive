import { useFormik } from 'formik';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import Button from '../components/Button';
import Input from '../components/Input';
import MainLayout from '../layouts/MainLayout';
import { restorePassword } from '../shared/api/auth';
import removeItemFromErrorsList from '../utils/removeItemFromErrorsList';
import LoaderIcon from '../assets/loader.svg';

const NewPasswordPage = (): JSX.Element => {
	const router = useRouter();

	const [errorsList, setErrorsList] = useState([]);

	const { mutate, isSuccess, isError, isLoading, error } = useMutation(restorePassword);

	useEffect(() => {
		if(isSuccess)
			router.push('/login');
	}, [isSuccess, router]);

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

			if(!_errorsList.length) {
				mutate({
					uid: router.query.uid as string,
					token: router.query.token as string,
					new_password: values.password,
				});
			}
		},
	});

	function getErrorMessage() {
		switch((error as any).response.status) {
			case 400:
				return 'Ссылка на восстановление недействительная или устарела';
			default:
				return 'Ой, что-то пошло не так. Попробуйте ещё раз позже';
		}
	}

	return (
		<MainLayout showFooter={false} errorMessage={isError && getErrorMessage()}>
			<h1 className='font-bold text-4xl mt-14 mb-7 lg:text-center'>
				Введите новый пароль
			</h1>
			<form onSubmit={formik.handleSubmit} className='lg:w-[418px] mx-auto'>
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
					className='my-5'
					isDanger={errorsList.includes('secondPassword')}
					name='secondPassword'
					type='password'
					placeholder='Повторите пароль'
					value={formik.values.secondPassword}
					onChange={(e) => {
						removeItemFromErrorsList(setErrorsList, 'secondPassword');
						formik.handleChange(e);
					}} />
				{isLoading ? (
					<LoaderIcon className='h-16 ml-36 hidden lg:block' />
				) : (
					<Button variant='primary' type='submit' label='Восстановить' />
				)}
				{errorsList.includes('repeat') && (
					<p className='font-semibold text-sm text-center text-red mt-5'>
						Пароли не совпадают
					</p>
				)}
				{isLoading ? (
					<LoaderIcon className='h-16 ml-36 mt-4 lg:hidden' />
				) : (
					<div className='fixed bottom-5 left-0 w-full px-4 lg:hidden'>
						<Button variant='primary' type='submit' label='Восстановить' />
					</div>
				)}
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
