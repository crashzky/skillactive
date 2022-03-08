import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import SectionCard from '../../components/SectionCard';
import useSection from '../../hooks/useSection';
import ResultsLayout from '../../layouts/ResultsLayout';
import { getClubs } from '../../shared/api/clubs';
import { GENDERS } from '../../shared/consts/filter';

const SearchPage = (): JSX.Element => {
	const selectedSection = useSection((state) => state.selectedSection);
	const { mutate, data } = useMutation(getClubs);

	const router = useRouter();

	useEffect(() => {
		const withAge = router.query.age ? { age: +router.query.age } : {};
		const withGender = router.query.gender ? { gender: GENDERS[router.query.gender as string] } : {};

		mutate({
			title: router.query.query as string,
			...withAge,
			...withGender,
		});
	}, [router, mutate]);

	useEffect(() => {
		if(selectedSection || selectedSection === 0) {
			window.scrollTo({
				left: 0,
				top: 240 * selectedSection + 200,
				behavior: 'smooth',
			});
		}
	}, [selectedSection]);

	return (
		<ResultsLayout>
			{data && data.map((i, num) => (
				<SectionCard
					key={num}
					onClick={() => router.push('/search/' + i.id)}
					className={'mb-6 shadow-none ' + (selectedSection === num && 'lg:bg-veryLightGrey')}
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
		</ResultsLayout>
	);
};

export default SearchPage;

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};
