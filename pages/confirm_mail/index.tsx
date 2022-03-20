import Button from '../../components/Button';
import MainLayout from '../../layouts/MainLayout';
import LoaderIcon from '../../assets/loader.svg';
import { useMutation } from 'react-query';
import { verifyUser } from '../../shared/api/auth';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ConfirmMailPage = (): JSX.Element => {
	const router = useRouter();

	const { mutate, isSuccess, isError, error, isLoading } = useMutation(verifyUser);
	
	useEffect(() => {
		mutate({
			uid: router.query.uid as string,
			token: router.query.token as string,
		});
	}, []);

	useEffect(() => {
		if(isSuccess)
			router.push('/login');
	}, [isSuccess, router]);

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
			<h1 className='font-bold text-4xl mt-14 mb-7 md:text-center'>
				Подтверждение аккаунта
			</h1>
			{isLoading ? (
				<LoaderIcon className='h-16 ml-36 mt-4 lg:hidden' />
			) : (
				<Button
					className='md:w-[418px] mx-auto block mt-10'
					onClick={() => {
						mutate({
							uid: router.query.uid as string,
							token: router.query.token as string,
						});
					}}
					variant='primary'
					label='Повторить попытку' />
			)}
		</MainLayout>
	);
};

export default ConfirmMailPage;
