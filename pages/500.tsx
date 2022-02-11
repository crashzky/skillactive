import MainLayout from '../layouts/MainLayout';
import { useRouter } from 'next/router';
import Button from '../components/Button';

import Robot500Icon from '../assets/images/robot_500.svg';

const Custom500 = (): JSX.Element => {
	const router = useRouter();

	return (
		<>
			<MainLayout showFooter={false}>
				<p className='font-bold text-[144px] text-center mt-6'>
					500
				</p>
				<Robot500Icon className='mx-auto' />
			</MainLayout>	
			<div className='fixed bottom-5 w-full px-4'>
				<Button variant='primary' label='Вернуться на главную' onClick={() => router.push('/')} />
			</div>
		</>
	);
};

export default Custom500;
