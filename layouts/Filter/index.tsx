import { useEffect, useState } from 'react';
import HorizontalMenu from '../../components/HorizontalMenu';
import Props from './Filter.props';
import InputSelect from '../../components/InputSelect';
import Input from '../../components/Input';
import InputTimetable from '../../components/InputTimetable';
import Button from '../../components/Button';
import useModal from '../../hooks/useModal';

const Filter = ({ className = '', ...props }: Props): JSX.Element => {
	const toggleShowFilter = useModal((state) => state.toggleShowFilter);
	const [showTranslate, setShowTranslate] = useState(true);

	const [piceType, setPriceType] = useState(0);
	const [category, setCategory] = useState();
	const [gender, setGender] = useState();
	const [age, setAge] = useState(10);
	const [district, setDistrict] = useState();
	const [weeks, setWeeks] = useState([]);
	const [hours, setHours] = useState([14, 16]);

	useEffect(() => setShowTranslate(false), []);

	return (
		<>
			<div
				className={className + ' pb-24 transition-all duration-[370ms] ' + (showTranslate && 'translate-y-full')}
				{...props}
			>
				<div className='mt-20 flex justify-between items-center'>
					<h2 className='font-bold text-3.5xl'>
						Фильтр
					</h2>
					<button className='font-bols text-sm text-primary'>
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
					options={[
						{ value: 'Футбол', label: 'Футбол' },
						{ value: 'Баскетбол', label: 'Баскетбол' },
						{ value: 'Волейбол', label: 'Волейбол' },
					]} />
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
				<InputSelect
					className='mt-10'
					placeholder='Микрорайон'
					value={district}
					onChange={setDistrict}
					options={[
						{ value: 'Пионерский', label: 'Пионерский' },
						{ value: 'Уралмаш', label: 'Уралмаш' },
						{ value: 'Эльмаш', label: 'Эльмаш' },
					]} />
				<InputTimetable
					className='mt-10'
					weeks={weeks}
					weeksOnChange={setWeeks}
					hours={hours}
					hourseOnChange={setHours} />
			</div>
			<div className='fixed w-full bottom-5 left-0 px-4'>
				<Button onClick={toggleShowFilter} variant='primary' label='Сохранить' />
			</div>
		</>
	);
};

export default Filter;
