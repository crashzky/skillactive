import MainLayout from '../../../layouts/MainLayout';
import withCheckAuthLayout from '../../../layouts/withCheckAuthLayout';
import PlusIcon from '../../../assets/plus.svg';
import { useRouter } from 'next/router';
import SectionCard from '../../../components/SectionCard';
import { GetStaticProps } from 'next';
import { useMutation, useQuery } from 'react-query';
import { getClubs } from '../../../shared/api/clubs';
import { useEffect } from 'react';
import { getCategories } from '../../../shared/api/categories';
import { WEEK_DAYS } from '../../../shared/consts/filter';

const SectionsPage = (): JSX.Element => {
	const router = useRouter();

	const categories = useQuery('categories', getCategories);
	const { mutate, data } = useMutation(getClubs);

	useEffect(() => {
		mutate({
			owned: true,
		});
	}, [mutate]);

	return (
		<MainLayout showFooter={false}>
			<div className='flex justify-between items-center mt-4'>
				<h1 className='font-bold text-4xl'>
					Занятия
				</h1>
				<button className='rounded-2.5xl p-3 bg-veryLightGrey' onClick={() => router.push('/lk/sections/new')}>
					<PlusIcon />
				</button>
			</div>
			<section className='mt-4'>
				{data && data.map((i, num) => {
					let _days = [];
					i.timetable.forEach((i) => {
						if(!_days.includes(WEEK_DAYS[i.day_of_the_week - 1]))
							_days.push(WEEK_DAYS[i.day_of_the_week - 1]);
					});

					return (
						<SectionCard
							onClick={() => router.push('/lk/sections/' + i.id)}
							key={num}
							className='mb-6 shadow-none'
							title={i.title}
							imageSrc={i.images[0]}
							category={categories.data && i.category ? categories.data.find((j) => j.id == i.category).name : ''}
							address={i.address}
							recordIsOpen={i.opened}
							minAge={i.min_age}
							maxAge={i.max_age}
							minHour={i.timetable.length && +i.timetable.sort((a, b) =>
								+a.start_time.slice(0, 2) < +b.start_time.slice(0, 2) ? -1 : 1)[0]
								.start_time.slice(0, 2)}
							maxHour={i.timetable.length && 
								+i.timetable.sort((a, b) => +a.end_time.slice(0, 2) > +b.end_time.slice(0, 2) ? -1 : 1)[0]
									.end_time.slice(0, 2)}
							days={_days}
							rating={+(i.comments.reduce((prev, curr) => prev + curr.rating, 0) / i.comments.length).toFixed(1)}
							reviewsCount={i.comments.length} />
					);
				})}
			</section>
		</MainLayout>	
	);
};

export default withCheckAuthLayout(SectionsPage);

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};
