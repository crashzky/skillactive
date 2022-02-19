import Button from '../Button';
import Props from './PriceCard.props';

const PriceCard = ({ className = '', title, price, onDelete, isShortCard, ...props }: Props): JSX.Element => {
	return (
		<article className={isShortCard && 'lg:w-fit'}>
			<div className={className + ' shadow-main rounded-2.5xl p-4 lg:h-full'} {...props}>
				<h3 className='font-semibold text-sm'>
					{title}
				</h3>
				<p className='mt-2.5 font-bold text-sm'>
					{!!price && price}
					{!!price && '₽'}
					
					{/* If price is 0 */}
					{!price && 'Бесплатно'}
				</p>
			</div>
			{onDelete && (
				<Button
					variant='red'
					label='Удалить'
					className='-mt-2 mb-5'
					onClick={onDelete} />
			)}
		</article>
	);
};

export default PriceCard;
