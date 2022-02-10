import SectionCard from '../../components/SectionCard';
import ResultsLayout from '../../layouts/ResultsLayout';

const SearchPage = (): JSX.Element => {
	return (
		<ResultsLayout>
			<SectionCard
				className='mb-6'
				title='Футболика'
				imageSrc='/DEV_ONLY.jpg'
				category='Секция футбола'
				address='Красноармейская 27'
				recordIsOpen
				minAge={6}
				maxAge={12}
				minHour={18}
				maxHour={20}
				days={['Вт', 'Чт', 'Сб']}
				rating={4.5}
				reviewsCount={21} />
			<SectionCard
				className='mb-6'
				title='Футболика'
				imageSrc='/DEV_ONLY.jpg'
				category='Секция футбола'
				address='Красноармейская 27'
				recordIsOpen={false}
				minAge={6}
				maxAge={12}
				minHour={18}
				maxHour={20}
				days={['Вт', 'Чт', 'Сб']}
				rating={4.5}
				reviewsCount={21} />
		</ResultsLayout>
	);
};

export default SearchPage;
