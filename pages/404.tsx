import MainLayout from '../layouts/MainLayout';
import { useRouter } from 'next/router';
import Button from '../components/Button';

import Robot404Icon from '../assets/images/robot_404.svg';

const Custom404 = (): JSX.Element => {
	const router = useRouter();

	return (
		<>
			<MainLayout showFooter={false} addPadding={false}>
				<div className='xl:h-[calc(100vh-165px)] xl:mt-24 xl:grid xl:px-48 grid-cols-2'>
					<div className='h-full xl:-mt-24 xl:w-[345px]'>
						<p className='font-bold text-[144px] xl:text-[200px] text-center mt-6'>
							404
						</p>
						<Button
							className='hidden xl:block'
							variant='primary'
							label='Вернуться на главную'
							onClick={() => router.push('/')} />
					</div>
					<Robot404Icon className='mx-auto xl:scale-[2.3]' />
				</div>
			</MainLayout>	
			<div className='fixed bottom-5 w-full px-4 xl:hidden'>
				<Button variant='primary' label='Вернуться на главную' onClick={() => router.push('/')} />
			</div>
		</>
	);
};

export default Custom404;
