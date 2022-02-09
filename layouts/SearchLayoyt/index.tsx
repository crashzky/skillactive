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
					<p className='text-xl font-bold'>
						Узнай какое
						<br />
						занятие
						<br />
						подойдет
						<br />
						вашему ребёнку
					</p>
					<SearchGirlIcon />
				</a>
			</Link>
			<section className='mt-6'>
				<div className='mb-7.5 flex justify-between items-center'>
					<h2 className='font-bold text-3.5xl'>
						Лента
					</h2>
					<Link href='/feed'>
						<a className='text-primary text-sm font-bold'>
							Смотреть всё
						</a>
					</Link>
				</div>
				{children}
				<Button
					onClick={() => router.push('/feed')}
					className='mt-2.5'
					variant='primary'
					label='Смотреть все' />
			</section>
			<Button className='mt-25' variant='veryLightGrey' label='Для партнеров' />
		</MainLayout>
	);
};

export default SearchLayout;
