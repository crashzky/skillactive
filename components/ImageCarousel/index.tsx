import { useEffect, useState } from 'react';
import Slider from 'react-slick';
import Props from './ImageCarousel.props';

import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const ImageCarousel = ({ children, onlyOneSlide }: Props): JSX.Element => {
	const [windowWidth, setWindowWidth] = useState(0);

	useEffect(() => {
		setWindowWidth(window.innerWidth);
	}, []);

	function getSlidesToShowCount() {
		if (windowWidth < 1024 || onlyOneSlide)
			return 1;
		else if(Math.floor((windowWidth - 384) / 355) > children.length)
			return children.length;
		else
			return Math.floor((windowWidth - 384) / 355);
	}

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		variableWidth: true,
		slidesToShow: getSlidesToShowCount(),
		slidesToScroll: 1,
	};

	return (
		<Slider {...settings}>
			{children}
		</Slider>
	);
};

export default ImageCarousel;
