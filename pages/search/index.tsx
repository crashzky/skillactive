import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import SectionCard from '../../components/SectionCard';
import useSection from '../../hooks/useSection';
import ResultsLayout from '../../layouts/ResultsLayout';
import { ICords } from '../../layouts/ResultsLayout/ResultsLayout.props';
import { getCategories } from '../../shared/api/categories';
import { getClubs } from '../../shared/api/clubs';
import { GENDERS, WEEK_DAYS } from '../../shared/consts/filter';

const SearchPage = (): JSX.Element => {
	const { selectedSection, setSectionsResult } = useSection();
	const { mutate, data } = useMutation(getClubs, {
		onSuccess: (res) => setSectionsResult(res),
	});
	const categories = useQuery('categories', getCategories);

	const router = useRouter();

	useEffect(() => {
		const withAge = router.query.age ? { age: +router.query.age } : {};
		const withGender = router.query.gender ? { gender: GENDERS[router.query.gender as string] } : {};
		const withCategories = router.query.category ? { categories: router.query.category as string } : {};
		const withDistrcits = router.query.district ? { districts: router.query.district as string } : {};
		const withWeeks = router.query.weeks ? {
			day_of_the_week: JSON.parse(router.query.weeks as string).map((i) => i + 1).join(','),
		} : {};
		const withHours = router.query.weeks ? {
			time_start: (+JSON.parse(router.query.hours as string)[0] < 10 && '0')
				+ JSON.parse(router.query.hours as string)[0] + ':00',
			time_end: (+JSON.parse(router.query.hours as string)[1] < 10 && '0')
				+ JSON.parse(router.query.hours as string)[1] + ':00',
		} : {};
		
		let withFree: any = {};
		if(router.query.price_type === '1')
			withFree.free = true;
		else if (router.query.price_type === '2')
			withFree.free = false;

		mutate({
			title: router.query.query as string,
			...withAge,
			...withGender,
			...withCategories,
			...withDistrcits,
			...withFree,
			...withWeeks,
			...withHours,
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

	let _cords: ICords = {};

	if(data) {
		data.forEach((i) => {
			_cords[i.id] = [+i.latitude, +i.longitude]; 
		});
	}

	return (
		<ResultsLayout cords={_cords}>
			{data && data.map((i, num) => {
				let _days = [];
				i.timetable.forEach((i) => {
					if(!_days.includes(WEEK_DAYS[i.day_of_the_week - 1]))
						_days.push(WEEK_DAYS[i.day_of_the_week - 1]);
				});

				return (
					<SectionCard
						key={num}
						onClick={() => router.push('/search/' + i.id)}
						className={'mb-6 shadow-none ' + (selectedSection == i.id && 'lg:bg-veryLightGrey')}
						title={i.title}
						imageSrc={i.images[0]}
						category={(categories.data && i.category)
							&& categories.data.find((j) => j.id === i.category).name}
						address={i.address}
						recordIsOpen={i.opened}
						minAge={i.min_age}
						maxAge={i.max_age}
						minHour={i.timetable.length &&
							+i.timetable.sort((a, b) => +a.start_time.slice(0, 2) < +b.start_time.slice(0, 2) ? -1 : 1)[0]
								.start_time.slice(0, 2)}
						maxHour={i.timetable.length &&
							+i.timetable.sort((a, b) => +a.end_time.slice(0, 2) > +b.end_time.slice(0, 2) ? -1 : 1)[0]
								.end_time.slice(0, 2)}
						days={_days}
						rating={+(i.comments.reduce((prev, curr) => prev + curr.rating, 0) / i.comments.length).toFixed(1)}
						reviewsCount={i.comments.length} />
				);
			})}
		</ResultsLayout>
	);
};

export default SearchPage;

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};
