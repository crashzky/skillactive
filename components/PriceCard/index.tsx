import Props from './PriceCard.props';

const PriceCard = ({ className = '', title, price, ...props }: Props): JSX.Element => {
	return (
		<article className={className + ' shadow-main rounded-2.5xl p-4'} {...props}>
			<h3 className='font-semibold text-sm'>
				{title}
			</h3>
			<p className='mt-2.5 font-bold text-sm'>
				{!!price && price}
				{!!price && '₽'}
				
				{/* If price is 0 */}
				{!price && 'Бесплатно'}
			</p>
		</article>
	);
};

export default PriceCard;
