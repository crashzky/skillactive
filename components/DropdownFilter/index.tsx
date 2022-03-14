import Props from './DropdownFilter.props';

import FilterIcon from '../../assets/filter.svg';
import ArrowIcon from '../../assets/arrow_down.svg';
import { useEffect, useState } from 'react';
import HorizontalMenu from '../HorizontalMenu';
import InputSelect from '../InputSelect';
import Input from '../Input';
import InputTimetable from '../InputTimetable';
import Button from '../Button';
import { ISelectValue } from '../InputSelect/InputSelect.props';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getCategories } from '../../shared/api/categories';
import { getDistricts } from '../../shared/api/districts';
import es from 'date-fns/esm/locale/es/index.js';

const DropdownFilter = ({ className = '', ...props }: Props): JSX.Element => {
	const [isOpen, setIsOpen] = useState(false);

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
	}, [router, categoriesQuery.data]);

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
		setIsOpen(!isOpen);
	};

	const resetFiltres = () => {
		router.push({
			pathname: router.pathname,
			query: {
				query: router.query.query,
			},
		});
		
		setIsOpen(!isOpen);
	};

	return (
		<div className={className + ' shadow-main rounded-xl transirion-all duration-200'} {...props}>
			<button
				className='grid grid-cols-[20px_auto_1fr_24px] gap-2 w-full items-center py-5 px-7'
				onClick={() => setIsOpen(!isOpen)}
			>
				<FilterIcon />
				<p className='font-semibold text-sm'>
					Фильтр
				</p>
				<div></div>
				<ArrowIcon className={'transirion-all duration-200 ' + (isOpen && 'rotate-180')} />
			</button>
			{isOpen && (
				<div className='px-7 pb-5'>
					<div className='flex justify-between items-center'>
						<HorizontalMenu
							className='mt-5 w-[345px]'
							items={['Все', 'Бесплатные', 'Платные']}
							value={piceType}
							onItemChange={setPriceType} />
						<button onClick={resetFiltres} className='font-bols text-sm text-primary'>
							Сбросить
						</button>
					</div>
					<InputSelect
						className='mt-5'
						isSearchable
						placeholder='Категория'
						value={category}
						onChange={setCategory}
						noOptionsMessage={() => 'Мы ничего не нашли :('}
						options={categoriesQuery.data && categoriesQuery.data.map((i) => ({ label: i.name, value: i.id }))} />
					<InputSelect
						className='mt-5'
						placeholder='Пол'
						isSearchable={false}
						value={gender}
						onChange={setGender}
						options={[
							{ value: 'Мужской', label: 'Мужской' },
							{ value: 'Женский', label: 'Женский' },
						]} />
					<div className='flex justify-between items-center font-semibold mt-5'>
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
						className='mt-5'
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
					<Button
						onClick={onClick}
						className='mt-5'
						variant='primary'
						label='Сохранить' />
				</div>
			)}
		</div>
	);
};

export default DropdownFilter;
