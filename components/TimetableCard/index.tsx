import Props from './TimetableCard.props';

const TimetableCard = ({ className = '', days, minTime, maxTime, ...props }: Props): JSX.Element => {
	const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

	return (
		<article className={className + 'lg:w-80 shadow-main rounded-2.5xl p-4 lg:h-full'} {...props}>
			<h3 className='font-semibold text-sm'>
				{days.map((i) => DAYS[i]).join(', ')}
			</h3>
			<p className='mt-2.5 font-bold text-sm'>
				{minTime}
				:00 -
				{' '}
				{maxTime}
				:00
			</p>
		</article>
	);
};

export default TimetableCard;
