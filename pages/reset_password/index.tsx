import { useFormik } from 'formik';
import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import Button from '../../components/Button';
import Input from '../../components/Input';
import MainLayout from '../../layouts/MainLayout';
import { sendRestorationRequest } from '../../shared/api/auth';
import removeItemFromErrorsList from '../../utils/removeItemFromErrorsList';
import LoaderIcon from '../../assets/loader.svg';

const ResetPasswordPage = (): JSX.Element => {
	const router = useRouter();

	const [errorsList, setErrorsList] = useState([]);

	const { mutate, isSuccess, isError, isLoading, error } = useMutation(sendRestorationRequest);

	useEffect(() => {
		if(isSuccess)
			router.push('/reset_password/after');
	}, [isSuccess, router]);

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
				mutate(values);
		},
	});

	function getErrorMessage() {
		switch((error as any).response.status) {
			case 404:
				return 'Пользователя с такой почтой не существует';
			default:
				return 'Ой, что-то пошло не так. Попробуйте ещё раз позже';
		}
	}

	return (
		<MainLayout showFooter={false} errorMessage={isError && getErrorMessage()}>
			<h1 className='font-bold text-4xl mt-14 mb-7 lg:text-center'>
				Востановление пароля
			</h1>
			<form onSubmit={formik.handleSubmit} className='lg:w-[418px] mx-auto'>
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
				{isLoading ? (
					<LoaderIcon className='h-16 ml-36 hidden lg:block' />
				) : (
					<Button
						className='mt-5 hidden lg:block'
						variant='primary'
						type='submit'
						label='Отправить ссылку на восстановление' />
				)}
				{isLoading ? (
					<LoaderIcon className='h-16 ml-36 mt-4 lg:hidden' />
				) : (
					<div className='lg:hidden fixed bottom-5 left-0 w-full px-4'>
						<Button variant='primary' type='submit' label='Отправить ссылку на восстановление' />
					</div>
				)}
			</form>
		</MainLayout>
	);
};

export default ResetPasswordPage;

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};
