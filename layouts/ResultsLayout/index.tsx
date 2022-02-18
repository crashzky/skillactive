import { useEffect, useRef, useState } from 'react';
import { Map, Placemark, YMaps } from 'react-yandex-maps';
import Button from '../../components/Button';
import HorizontalMenu from '../../components/HorizontalMenu';
import useModal from '../../hooks/useModal';
import Filter from '../Filter';
import MainLayout from '../MainLayout';
import Props from './ResultsLayout.props';
import Link from 'next/link';
import { useRouter } from 'next/router';

import ArrowIcon from '../../assets/arrow.svg';
import CrossIcon from '../../assets/cross.svg';
import PersonIcon from '../../assets/card/person.svg';
import ClockIcon from '../../assets/card/clock.svg';
import StarIcon from '../../assets/card/star.svg';
import FilterIcon from '../../assets/filter.svg';
import SearchPanel from '../../components/SearchPanel';

const ResultsLayout = ({ children }: Props): JSX.Element => {
	const { query } = useRouter();
	const [selectedMenuItem, setSelectedMenuItem] = useState(0);

	const showFilter = useModal((state) => state.showFilter);
	const toggleShowFilter = useModal((state) => state.toggleShowFilter);
	const [showContent, setShowContent] = useState(true);

	const articleRef = useRef(null);
	const [selectedSection, setSelectedSection] = useState(null);
	const [showSectionArticle, setShowSectionArticle] = useState(false);

	useEffect(() => {
		if(showFilter) {
			setSelectedSection(null);
			setShowSectionArticle(false);
			setTimeout(() => setShowContent(false), 1000);
		}
		else
			setShowContent(true);
	}, [showFilter]);

	useEffect(() => {
		if((selectedSection || selectedSection === 0) && articleRef.current)
			setShowSectionArticle(true);
		else if(articleRef.current) {
			articleRef.current.style.bottom = '-100%';
			setTimeout(() => setShowSectionArticle(false), 200);
		}
	}, [selectedSection]);

	useEffect(() => {
		if(showSectionArticle)
			articleRef.current.style.bottom = 0;
	}, [showSectionArticle]);

	return (
		<>
			<MainLayout showFooter={!!children && selectedMenuItem !== 1} showHeader={!showFilter}>
				{showFilter && <Filter />}
				<SearchPanel className='mt-8' />
				{showContent && (
					<>
						<HorizontalMenu
							className='mt-7 lg:hidden'
							value={selectedMenuItem}
							onItemChange={(value) => {
								setSelectedSection(null);
								setSelectedMenuItem(value);
							}}
							items={[
								'Списком',
								'На карте',
							]} />
						{selectedMenuItem === 0 && (
							<>
								<Button className='my-4 lg:hidden' variant='filter' label='Фильтр' onClick={toggleShowFilter} />
								<section>
									{!children && (
										<p className='font-bold text-lg text-center mt-24'>
											По вашим критериям к сожалению ничего не найдено 😔
											Попробуйте изменить фильтр
										</p>
									)}
									{children}
								</section>
							</>
						)}
					</>
				)}
			</MainLayout>
			{(selectedMenuItem === 1 && !showFilter) && (
				<button onClick={toggleShowFilter} className='fixed z-30 top-64 right-4 rounded-2xl p-4 bg-veryLightGrey'>
					<FilterIcon />
				</button>
			)}
			{/* map */}
			{(selectedMenuItem === 1 && !showFilter) && (
				<YMaps>
					<Map className='mt-4 w-full h-[calc(100vh-238px)]' defaultState={{ center: [55.75, 37.57], zoom: 9 }}>
						<Placemark geometry={[55.75, 37.57]} onClick={() => setSelectedSection(1)} />
					</Map>
				</YMaps>
			)}
			{/* bottom sectipon card in map-style results */}
			<article
				ref={articleRef}
				className={'fixed w-full bg-white rounded-t-3xl p-4 transition-all duration-200 '
					+ (!showSectionArticle && 'hidden')}
				style={{
					bottom: '-100%',
				}}
			>
				<Link href={{
					pathname: '/search/' + 1,
					query,
				}}
				>
					<a className='block w-fit mx-auto'>
						<ArrowIcon />
					</a>
				</Link>
				<div className='flex justify-between items-center'>
					<div className='px-4 py-1 rounded-lg bg-green w-fit h-fit'>
						<p className='text-white font-semibold text-sm'>
							Запись открыта
						</p>
					</div>
					<button className='p-2.5 rounded-2xl bg-veryLightGrey' onClick={() => setSelectedSection(null)}>
						<CrossIcon />
					</button>
				</div>
				<h2 className='font-bold text-2xl mt-2.5'>
					Футболика
				</h2>
				<p className='mt-2 text-sm text-darkGrey'>
					Секция футбола
				</p>
				<p className='mt-2 text-sm text-darkGrey'>
					Красноармейская 27 
				</p>
				<div className='grid grid-cols-[30px_1fr] items-center gap-2 mt-2.5'>
					<div className='p-1.5 bg-veryLightGrey rounded-md'>
						<PersonIcon />
					</div>
					<p className='font-sm text-darkGrey'>
						12-16 лет
					</p>
				</div>
				<div className='grid grid-cols-[30px_1fr] items-center gap-2 mt-2.5'>
					<div className='p-1.5 bg-veryLightGrey rounded-md'>
						<ClockIcon />
					</div>
					<p className='font-sm text-darkGrey'>
						с 18:00 до 20:00 - Вт, Чт, Сб
					</p>
				</div>
				<div className='grid grid-cols-[30px_1fr] items-center gap-2 mt-2.5'>
					<div className='p-1.5 bg-veryLightGrey rounded-md'>
						<StarIcon />
					</div>
					<p className='font-sm text-darkGrey'>
						4.5 / 5 • 21 оценка
					</p>
				</div>
			</article>
		</>
	);
};

export default ResultsLayout;
