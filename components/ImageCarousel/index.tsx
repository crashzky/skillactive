import Carousel from 'nuka-carousel';
import Props from './ImageCarousel.props';

const ImageCarousel = ({ children }: Props): JSX.Element => {
	return (
		<Carousel
			defaultControlsConfig={{
				nextButtonText: '>',
				nextButtonStyle: {
					background: 'url(/gallery_next_arrow.svg)',
					fontSize: 24,
					color: 'transparent',
				},
				prevButtonText: '<',
				prevButtonStyle: {
					background: 'url(/gallery_next_arrow.svg)',
					transform: 'rotate(180deg)',
					fontSize: 24,
					color: 'transparent',
				},
				pagingDotsStyle: {
					fill: 'white',
					margin: '0 4px',
				},
			}}
		>
			{children}
		</Carousel>
	);
};

export default ImageCarousel;
