import { format } from 'date-fns';
import Props from './RequestCard.props';

const RequestCard = ({ className = '', requestId, createdDate, comment, creatorName, phone, isViewed,
	onToggleActive, ...props }: Props): JSX.Element => {
	return (
		<article className={className + ' w-full rounded-2.5xl bg-veryLightGrey'} {...props}>
			<div className='p-4'>
				<div>
					<h2 className='font-bold text-2xl inline-block mr-2.5'>
						Заявка №
						{requestId}
					</h2>
					<span
						className={'px-4 py-[3px] rounded-lg font-semibold text-white text-sm '
							+ (isViewed ? 'bg-green' : 'bg-primary')}
					>
						Новая
					</span>
				</div>
				<div className='grid grid-cols-[1fr_auto] items-end mt-1'>
					<div>
						<p className='font-semibold text-lg text-darkGrey'>
							{format(createdDate, 'dd.MM.yyyy HH:mm')}
						</p>
						<p className='font-semibold text-lg text-darkGrey mt-1'>
							Комментарий:
							{' ' + comment}
						</p>
					</div>
					<button
						className='border-2 border-darkGrey rounded-lg p-[3px] mb-5 '
						onClick={onToggleActive}
					>
						<div className={'rounded-[5px] w-[21px] h-[21px] bg-green ' + (!isViewed && 'opacity-0')}>

						</div>
					</button>
				</div>
			</div>
			<div className={'px-4 py-5 flex justify-between items-center rounded-b-2.5xl '
				+ (isViewed ? 'bg-green' : 'bg-primary')}
			>
				<p className='font-bold text-lg text-white'>
					{creatorName}
				</p>
				<p className='font-bold text-lg text-white'>
					{phone}
				</p>
			</div>
		</article>
	);
};

export default RequestCard;
