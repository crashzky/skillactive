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
import DropdownFilter from '../../components/DropdownFilter';
import useSection from '../../hooks/useSection';

const ResultsLayout = ({ children, cords = [] }: Props): JSX.Element => {
	const { query } = useRouter();
	const [selectedMenuItem, setSelectedMenuItem] = useState(0);
	const [windowWidth, setWindowWidth] = useState(0);

	const showFilter = useModal((state) => state.showFilter);
	const toggleShowFilter = useModal((state) => state.toggleShowFilter);
	const [showContent, setShowContent] = useState(true);

	const articleRef = useRef(null);
	const selectedSection = useSection((state) => state.selectedSection);
	const setSelectedSection = useSection((state) => state.setSelectedSection);
	const [showSectionArticle, setShowSectionArticle] = useState(false);

	useEffect(() => {
		setWindowWidth(window.innerWidth);
	}, []);

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
			<MainLayout showFooter={!!children && selectedMenuItem !== 1} showHeader={!showFilter} addPadding={false}>
				{showFilter && <Filter />}
				<div className='px-4 lg:px-48'>
					<SearchPanel className='mt-8' />
				</div>
				{showContent && (
					<div className='px-4 lg:px-0'>
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
								<section className='lg:grid lg:mt-4 lg:pl-5 xl:pl-48 grid-cols-2'>
									<div className='lg:pr-7'>
										<DropdownFilter className='hidden lg:block mb-5' />
										{!children && (
											<p className='font-bold text-lg text-center mt-24'>
												По вашим критериям к сожалению ничего не найдено 😔
												Попробуйте изменить фильтр
											</p>
										)}
										{children}
									</div>
									<YMaps>
										<Map
											className='w-full min-h-[calc(100vh-200px)] hidden lg:block'
											defaultState={{
												center: [
													Object.keys(cords).reduce((prev, curr) => prev + cords[curr][0], 0)
														/ Object.keys(cords).length,
													Object.keys(cords).reduce((prev, curr) => prev + cords[curr][1], 0)
														/ Object.keys(cords).length,
												],
												zoom: 13,
											}}
										>
											{Object.keys(cords).map((i, num) => (
												<Placemark 
													key={num}
													options={{
														iconColor: selectedSection === i ? 'red' : '#1E98FF',
													}}
													geometry={[cords[i][0], cords[i][1]]}
													onClick={() => setSelectedSection(i)} />
											))}
										</Map>
									</YMaps>
								</section>
							</>
						)}
					</div>
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
					<Map
						className='mt-4 w-full h-[calc(100vh-238px)]'
						defaultState={{
							center: [
								Object.keys(cords).reduce((prev, curr) => prev + cords[curr][0], 0)
									/ Object.keys(cords).length,
								Object.keys(cords).reduce((prev, curr) => prev + cords[curr][1], 0)
									/ Object.keys(cords).length,
							],
							zoom: 13,
						}}
					>
						{Object.keys(cords).map((i, num) => (
							<Placemark 
								key={num}
								options={{
									iconColor: selectedSection === i ? 'red' : '#1E98FF',
								}}
								geometry={[cords[i][0], cords[i][1]]}
								onClick={() => setSelectedSection(i)} />
						))}
					</Map>
				</YMaps>
			)}
			{/* bottom sectipon card in map-style results */}
			<article
				ref={articleRef}
				className={
					' fixed w-full bg-white rounded-t-3xl p-4 transition-all duration-200 '
					+ ((!showSectionArticle || windowWidth >= 1024) && 'hidden')}
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
