import { GetStaticProps } from 'next';
import { useEffect } from 'react';
import SectionCard from '../../components/SectionCard';
import useSection from '../../hooks/useSection';
import ResultsLayout from '../../layouts/ResultsLayout';

const SearchPage = (): JSX.Element => {
	const selectedSection = useSection((state) => state.selectedSection);

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
			<SectionCard
				className={'mb-6 shadow-none ' + (selectedSection === 0 && 'lg:bg-veryLightGrey')}
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
				className={'mb-6 shadow-none ' + (selectedSection === 1 && 'lg:bg-veryLightGrey')}
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
			<SectionCard
				className={'mb-6 shadow-none ' + (selectedSection === 2 && 'lg:bg-veryLightGrey')}
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
				className={'mb-6 shadow-none ' + (selectedSection === 3 && 'lg:bg-veryLightGrey')}
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
			<SectionCard
				className={'mb-6 shadow-none ' + (selectedSection === 4 && 'lg:bg-veryLightGrey')}
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
				className={'mb-6 shadow-none ' + (selectedSection === 5 && 'lg:bg-veryLightGrey')}
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

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};
