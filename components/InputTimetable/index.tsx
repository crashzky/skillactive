import { useState } from 'react';
import Props from './InputTimetable.props';
import { Range, getTrackBackground } from 'react-range';
import Button from '../Button';

const InputTimetable = ({ className = '', weeks, weeksOnChange, hours, hourseOnChange, onDelete,
	...props }: Props): JSX.Element => {
	const WEEK_DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
	const [key, setKey]= useState(false);

	const [localHours, setLocalHours] = useState(hours);
	const [changeTimeout, setChangeTimeout] = useState(null);

	const onClickWeeks = (num) => {
		let _weeks = weeks;
		if(_weeks.includes(num))
			_weeks.splice(_weeks.indexOf(num), 1);
		else
			_weeks.push(num);

		_weeks.sort();
		weeksOnChange(_weeks);
		setKey(!key);
	};

	return (
		<div key={key.toString()} className={className + ' lg:grid grid-cols-2 gap-12 items-start'} {...props}>
			<div>
				<div className='flex justify-between items-center'>
					<p className='font-semibold text-xl'>
						Дни занятий
					</p>
					<p className='font-semibold text-primary'>
						{weeks.map((i) => WEEK_DAYS[i]).join(', ')}
					</p>
				</div>
				<div className='flex justify-between flex-wrap mt-4'>
					{WEEK_DAYS.map((i, num) => (
						<button
							key={num}
							className={'p-3.5 rounded-2xl font-semibold text-sm '
								+ (weeks.includes(num) ? 'bg-primary text-white' : 'bg-veryLightGrey')}
							onClick={() => onClickWeeks(num)}
						>
							{i}
						</button>
					))}
				</div>
			</div>
			<div>
				<div className='flex justify-between items-center mt-8 mb-4 lg:mt-auto'>
					<p className='font-semibold text-xl'>
						Время занятий
					</p>
					<p className='font-semibold text-primary'>
						{localHours[0]}
						:00 - 
						{' '}
						{localHours[1]}
						:00
					</p>
				</div>
				<Range
					values={localHours}
					onChange={(values) => {
						setLocalHours(values);
						clearTimeout(changeTimeout);
						setChangeTimeout(setTimeout(() => hourseOnChange(values), 500));
					}}
					min={0}
					max={23}
					step={1}
					renderTrack={({ props, children }) => (
						<div
							onMouseDown={props.onMouseDown}
							onTouchStart={props.onTouchStart}
							className='h-[30px] flex w-full outline-none'
						>
							<div
								ref={props.ref}
								className='h-3 w-full rounded-full self-center'
								style={{
									background: getTrackBackground({
										values: localHours,
										colors: ['#F8F8F8', '#FEA300', '#F8F8F8'],
										min: 1,
										max: 23,
									}),
								}}
							>
								{children}
							</div>
						</div>
					)}
					renderThumb={({ props }) => (
						<div
							{...props}
							className={'h-[30px] w-[30px] bg-[url(/input_range_thumb.svg)] outline-none'}
						>
						</div>
					)} />
			</div>
			{onDelete && (
				<Button variant='red' label='Удалить' className='mt-4' onClick={onDelete} />
			)}
		</div>
	);
};

export default InputTimetable;
