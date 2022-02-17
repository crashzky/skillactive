import MainLayout from '../../layouts/MainLayout';
import GirlAndLaptopImage from '../../assets/images/girl_and_laptop.svg';
import Button from '../../components/Button';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';

const AfterResetPassword = (): JSX.Element => {
	const router = useRouter();

	return (
		<>
			<MainLayout showFooter={false}>
				<div className='flex flex-col items-center justify-between lg:flex-row-reverse lg:h-96'>
					<GirlAndLaptopImage className='mt-8 mx-auto lg:scale-[1.6]' />
					<div>
						<p className='font-bold text-xl mt-5'>
							Проверьте свою почту. Мы направили
							{' '}
							<br className='hidden lg:block' />
							вам ссылку для восстановления
						</p>
						<Button
							variant='primary'
							className='mt-10 hidden lg:block'
							label='Вернуться на главную'
							onClick={() => router.push('/')} />
					</div>
				</div>
			</MainLayout>
			<div className='fixed bottom-5 w-full px-4 lg:hidden'>
				<Button variant='primary' label='Вернуться на главную' onClick={() => router.push('/')} />
			</div>
		</>
	);
};

export default AfterResetPassword;

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};
