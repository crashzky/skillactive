import MainLayout from '../layouts/MainLayout';
import GirlAndManImage from '../assets/images/girl_and_man.svg';
import Button from '../components/Button';
import { useRouter } from 'next/router';
import { GetStaticProps } from 'next';

const SuccessPage = (): JSX.Element => {
	const router = useRouter();

	return (
		<>
			<MainLayout showFooter={false}>
				<GirlAndManImage className='mx-auto mt-7' />
				<p className='font-bold text-2xl mt-8'>
					Ваша заявка в секцию
					{' '}
					<span className='text-primary'>
						Футболика
					</span>
					{' '}
					- принята, ожидайте пока с вами свяжется представитель секции.
				</p>
			</MainLayout>
			<div className='fixed bottom-5 w-full px-4 md:w-96 md:static md:mt-5 md:block md:mx-auto'>
				<Button variant='primary' label='Вернуться на главную' onClick={() => router.push('/')} />
			</div>	
		</>
	);
};

export default SuccessPage;

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};

