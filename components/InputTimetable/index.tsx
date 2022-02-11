import { useState } from 'react';
import Props from './InputTimetable.props';
import { Range, getTrackBackground } from 'react-range';

const InputTimetable = ({ className = '', weeks, weeksOnChange, hours, hourseOnChange, ...props }: Props): JSX.Element => {
	const WEEK_DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
	const [key, setKey]= useState(false);

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
		<div key={key.toString()} className={className + ' '} {...props}>
			<div className='flex justify-between items-center'>
				<p className='font-semibold text-xl'>
					Дни занятий
				</p>
				<p className='font-semibold text-primary'>
					{weeks.map((i) => WEEK_DAYS[i]).join(', ')}
				</p>
			</div>
			<div className='flex justify-between mt-4'>
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
			<div className='flex justify-between items-center mt-8 mb-4'>
				<p className='font-semibold text-xl'>
					Время занятий
				</p>
				<p className='font-semibold text-primary'>
					{hours[0]}
					:00 - 
					{' '}
					{hours[1]}
					:00
				</p>
			</div>
			<Range	
				values={hours}
				onChange={(values) => hourseOnChange(values)}
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
									values: hours,
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
	);
};

export default InputTimetable;
