import SearchPanel from '../../components/SearchPanel';
import MainLayout from '../MainLayout';
import Props from './SearchLayout.props';
import Link from 'next/link';

import SearchGirlIcon from '../../assets/images/search_girl.svg';
import Button from '../../components/Button';
import { useRouter } from 'next/router';

const SearchLayout = ({ children }: Props): JSX.Element => {
	const router = useRouter();

	return (
		<MainLayout>
			<SearchPanel className='mt-6.5' placeholder='Введите название секции или кружка' />
			<Link href='/analytics/preview'>
				<a className='w-full flex justify-between py-9 px-4 mt-6 shadow-main rounded-2.5xl'>
					<div className='lg:ml-10'>
						<p className='text-xl lg:mt-2.5 font-bold'>
							Узнай какое
							{' '}
							<br className='lg:hidden' />
							занятие
							<br />
							подойдет
							{' '}
							<br className='lg:hidden' />
							вашему ребёнку
						</p>
						<Button variant='primary' label='Узнать' className='hidden lg:block w-fit px-[70px] mt-2.5 ' />
					</div>
					<div>
						<SearchGirlIcon className='lg:scale-150 inline-block' />
						<SearchGirlIcon className='hidden lg:inline-block scale-75' />
						<SearchGirlIcon className='hidden lg:inline-block -scale-x-100' />
					</div>
				</a>
			</Link>
			<section className='mt-6'>
				<div className='mb-7.5 flex justify-between items-center'>
					<h2 className='font-bold text-3.5xl'>
						Лента
					</h2>
					<Link href='/articles'>
						<a className='text-primary text-sm font-bold'>
							Смотреть всё
						</a>
					</Link>
				</div>
				<div className='lg:flex flex-wrap gap-3 pb-5'>
					{children}
				</div>
				<Button
					onClick={() => router.push('/articles')}
					className='mt-2.5 lg:hidden'
					variant='primary'
					label='Смотреть все' />
			</section>
			<Button
				className='mt-25 lg:hidden'
				variant='veryLightGrey'
				label='Для партнеров'
				onClick={() => router.push('/partners')} />
		</MainLayout>
	);
};

export default SearchLayout;
