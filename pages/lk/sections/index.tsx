import MainLayout from '../../../layouts/MainLayout';
import withCheckAuthLayout from '../../../layouts/withCheckAuthLayout';
import PlusIcon from '../../../assets/plus.svg';
import { useRouter } from 'next/router';
import SectionCard from '../../../components/SectionCard';
import { GetStaticProps } from 'next';
import { useMutation, useQuery } from 'react-query';
import { getClubs } from '../../../shared/api/clubs';
import { useEffect } from 'react';

const SectionsPage = (): JSX.Element => {
	const router = useRouter();

	const { mutate, data, isError } = useMutation(getClubs);

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
				{data && data.map((i, num) => (
					<SectionCard
						onClick={() => router.push('/lk/sections/' + i.id)}
						key={num}
						className='mb-6 shadow-none'
						title={i.title}
						imageSrc='/DEV_ONLY.jpg'
						category='Секция футбола'
						address={i.address}
						recordIsOpen={i.opened}
						minAge={i.min_age}
						maxAge={i.max_age}
						minHour={18}
						maxHour={20}
						days={['Вт', 'Чт', 'Сб']}
						rating={+(i.comments.reduce((prev, curr) => prev + curr.rating, 0) / i.comments.length).toFixed(1)}
						reviewsCount={i.comments.length} />
				))}
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
