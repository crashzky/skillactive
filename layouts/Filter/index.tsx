import { useEffect, useState } from 'react';
import HorizontalMenu from '../../components/HorizontalMenu';
import Props from './Filter.props';
import InputSelect from '../../components/InputSelect';
import Input from '../../components/Input';
import InputTimetable from '../../components/InputTimetable';
import Button from '../../components/Button';
import useModal from '../../hooks/useModal';
import { useRouter } from 'next/router';
import { ISelectValue } from '../../components/InputSelect/InputSelect.props';
import { useQuery } from 'react-query';
import { getCategories } from '../../shared/api/categories';
import { getDistricts } from '../../shared/api/districts';

const Filter = ({ className = '', ...props }: Props): JSX.Element => {
	const toggleShowFilter = useModal((state) => state.toggleShowFilter);
	const [showTranslate, setShowTranslate] = useState(true);

	const [piceType, setPriceType] = useState(0);
	const [category, setCategory] = useState<ISelectValue>();
	const [gender, setGender] = useState<ISelectValue>();
	const [age, setAge] = useState(10);
	const [district, setDistrict] = useState<ISelectValue>();
	const [weeks, setWeeks] = useState([]);
	const [hours, setHours] = useState([14, 16]);

	const router = useRouter();

	const categoriesQuery = useQuery('categories', getCategories);
	const distrcitsQuery = useQuery('distrcits', getDistricts);

	useEffect(() => {
		const { price_type, gender, age, weeks, hours } = router.query;

		setPriceType(+price_type);
		setGender(gender && { value: gender as string, label: gender as string });
		setAge(age ? +age : 10);
		setWeeks(weeks ? JSON.parse(weeks as string) : []);
		setHours(hours ? JSON.parse(hours as string) : [14, 16]);

		setShowTranslate(false);
	}, [router]);

	useEffect(() => {
		const { category } = router.query;
		
		const currentCategory = (category && categoriesQuery.data) && categoriesQuery.data.find((i) => i.id === +category);

		setCategory(currentCategory && { value: currentCategory.id.toString(), label: currentCategory.name });
	}, [router, categoriesQuery.data]);

	useEffect(() => {
		const { district } = router.query;
		
		const currentDistrcit = (district && distrcitsQuery.data) && distrcitsQuery.data.find((i) => i.id === +district);

		setDistrict(currentDistrcit && { value: currentDistrcit.id.toString(), label: currentDistrcit.name });
	}, [router, distrcitsQuery.data]);

	const onClick = () => {
		const withCategory = category ? { category: category.value } : {};
		const withGender = gender ? { gender: gender.value } : {};
		const withDistrict = district ? { district: district.value } : {};
		const withWeeks = weeks && weeks.length ? { weeks: JSON.stringify(weeks) } : {};
		const withHours = hours ? { hours: JSON.stringify(hours) } : {};

		router.push({
			pathname: router.pathname,
			query: {
				...router.query,
				price_type: piceType,
				...withCategory,
				...withGender,
				age: age,
				...withDistrict,
				...withWeeks,
				...withHours,
			},
		});

		toggleShowFilter();
	};

	const resetFiltres = () => {
		router.push({
			pathname: router.pathname,
			query: {
				query: router.query.query,
			},
		});
		toggleShowFilter();
	};

	return (
		<>
			<div
				className={className + ' pb-24 transition-all duration-[370ms] px-4 ' + (showTranslate && 'translate-y-full')}
				{...props}
			>
				<div className='mt-20 flex justify-between items-center'>
					<h2 className='font-bold text-3.5xl'>
						Фильтр
					</h2>
					<button onClick={resetFiltres} className='font-bols text-sm text-primary'>
						Сбросить
					</button>
				</div>
				<HorizontalMenu
					className='mt-5'
					items={['Все', 'Бесплатные', 'Платные']}
					value={piceType}
					onItemChange={setPriceType} />
				<InputSelect
					className='mt-10'
					isSearchable
					placeholder='Категория'
					value={category}
					onChange={setCategory}
					noOptionsMessage={() => 'Мы ничего не нашли :('}
					options={categoriesQuery.data && categoriesQuery.data.map((i) => ({ label: i.name, value: i.id }))} />
				<InputSelect
					className='mt-10'
					placeholder='Пол'
					isSearchable={false}
					value={gender}
					onChange={setGender}
					options={[
						{ value: 'Мужской', label: 'Мужской' },
						{ value: 'Женский', label: 'Женский' },
					]} />
				<div className='flex justify-between items-center font-semibold mt-14'>
					<p className='text-xl'>
						Возраст ребёнка
					</p>
					<p className='text-lg text-primary'>
						{age}
						{' '}
						лет
					</p>
				</div>
				<Input
					variant='range'
					className='mt-4'
					min={1}
					max={17}
					value={age}
					onChange={(e) => setAge(+e.target.value)} />
				<div className='flex justify-between font-semibold'>
					<p>
						1 год
					</p>
					<p>
						17 лет
					</p>
				</div>
				<InputSelect
					className='mt-10'
					placeholder='Микрорайон'
					value={district}
					onChange={setDistrict}
					options={distrcitsQuery && distrcitsQuery.data.map((i) => ({ value: i.id, label: i.name }))} />
				<InputTimetable
					className='mt-10'
					weeks={weeks}
					weeksOnChange={setWeeks}
					hours={hours}
					hourseOnChange={setHours} />
			</div>
			<div className='fixed w-full bottom-5 left-0 px-4'>
				<Button onClick={onClick} variant='primary' label='Сохранить' />
			</div>
		</>
	);
};

export default Filter;
