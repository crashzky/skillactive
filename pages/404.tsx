import MainLayout from '../layouts/MainLayout';
import { useRouter } from 'next/router';
import Button from '../components/Button';

import Robot404Icon from '../assets/images/robot_404.svg';

const Custom404 = (): JSX.Element => {
	const router = useRouter();

	return (
		<>
			<MainLayout showFooter={false}>
				<p className='font-bold text-[144px] text-center mt-6'>
					404
				</p>
				<Robot404Icon className='mx-auto' />
			</MainLayout>	
			<div className='fixed bottom-5 w-full px-4'>
				<Button variant='primary' label='Вернуться на главную' onClick={() => router.push('/')} />
			</div>
		</>
	);
};

export default Custom404;
