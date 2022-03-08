import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import SectionCard from '../../../components/SectionCard';
import MainLayout from '../../../layouts/MainLayout';
import withCheckAuthLayout from '../../../layouts/withCheckAuthLayout';
import { getCategories } from '../../../shared/api/categories';
import { getClubs } from '../../../shared/api/clubs';

const RequestsPage = (): JSX.Element => {
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
			<section className='mt-6'>
				{data && data.map((i, num) => (
					<SectionCard
						onClick={() => router.push('/lk/requests/' + i.id)}
						key={num}
						className='mb-6 shadow-none'
						title={i.title}
						imageSrc='/DEV_ONLY.jpg'
						category={categories.data && categories.data.find((j) => j.id == i.category).name}
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

export default withCheckAuthLayout(RequestsPage);

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};
