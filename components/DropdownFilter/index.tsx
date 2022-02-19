import Props from './DropdownFilter.props';

import FilterIcon from '../../assets/filter.svg';
import ArrowIcon from '../../assets/arrow_down.svg';
import { useState } from 'react';
import HorizontalMenu from '../HorizontalMenu';
import InputSelect from '../InputSelect';
import Input from '../Input';
import InputTimetable from '../InputTimetable';
import Button from '../Button';

const DropdownFilter = ({ className = '', ...props }: Props): JSX.Element => {
	const [isOpen, setIsOpen] = useState(false);

	const [piceType, setPriceType] = useState(0);
	const [category, setCategory] = useState();
	const [gender, setGender] = useState();
	const [age, setAge] = useState(10);
	const [district, setDistrict] = useState();
	const [weeks, setWeeks] = useState([]);
	const [hours, setHours] = useState([14, 16]);

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
						<button className='font-bols text-sm text-primary'>
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
						options={[
							{ value: 'Футбол', label: 'Футбол' },
							{ value: 'Баскетбол', label: 'Баскетбол' },
							{ value: 'Волейбол', label: 'Волейбол' },
						]} />
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
					<Button
						onClick={() => setIsOpen(!isOpen)}
						className='mt-5'
						variant='primary'
						label='Сохранить' />
				</div>
			)}
		</div>
	);
};

export default DropdownFilter;
