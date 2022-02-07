import Props from './Comment.props';
import { intervalToDuration } from 'date-fns';
import RatingArrowIcon from '../../assets/rating_arrow.svg';

const Comment = ({ title, createdTime, message, rating, commentRating, answers, className='', ...props }: Props): JSX.Element => {
	const intervalToCurrentDate = intervalToDuration({
		start: createdTime,
		end: new Date(Date.now()),
	});

	return (
		<article className={className + ' rounded-2.5xl shadow-main pt-5 pb-7.5 px-4'}>
			<div>
				<h3 className='font-bold inline-block mr-2.5'>
					{title}
				</h3>
				<p className='inline-block font-semibold text-sm text-grey'>
					{!!intervalToCurrentDate.years && intervalToCurrentDate.years + ' г. '}
					{!!intervalToCurrentDate.months && intervalToCurrentDate.months + ' мес. '}
					{!!intervalToCurrentDate.weeks && intervalToCurrentDate.weeks + ' нед. '}
					{!!intervalToCurrentDate.hours && intervalToCurrentDate.hours + ' ч. '}
				</p>
			</div>
			<p className='mt-1.5 mb-px'>
				{message}
			</p>
			<div className='mt-px grid items-center grid-cols-[repeat(3,auto)_1fr_auto] gap-1.5'>
				<RatingArrowIcon className='rotate-180 fill-green' />
				<RatingArrowIcon />
				<p className={'font-semibold text-sm ' + (commentRating >= 0 ? 'text-green' : 'text-red')}>
					{commentRating}
				</p>
				<div></div>
				<button className='font-semibold text-sm text-primary'>
					ответить
				</button>
			</div>
			{answers.map((i, num) => {
				const intervalToCurrentDate = intervalToDuration({
					start: i.createdTime,
					end: new Date(Date.now()),
				});

				return (
					<div className='mt-3 ml-10' key={num}>
						<div>
							<h3 className='font-bold inline-block mr-2.5'>
								{i.title}
							</h3>
							<p className='inline-block font-semibold text-sm text-grey'>
								{!!intervalToCurrentDate.years && intervalToCurrentDate.years + ' г. '}
								{!!intervalToCurrentDate.months && intervalToCurrentDate.months + ' мес. '}
								{!!intervalToCurrentDate.weeks && intervalToCurrentDate.weeks + ' нед. '}
								{!!intervalToCurrentDate.hours && intervalToCurrentDate.hours + ' ч. '}
							</p>
						</div>
						<p className='mt-1.5 mb-px'>
							{i.message}
						</p>
					</div>
				);
			})}
		</article>
	);
};

export default Comment;
