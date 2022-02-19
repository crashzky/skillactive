import Props from './SectionCard.props';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import PersonIcon from '../../assets/card/person.svg';
import ClockIcon from '../../assets/card/clock.svg';
import StarIcon from '../../assets/card/star.svg';

const SectionCard = ({ className = '', imageSrc, title, recordIsOpen, category, address,
	minAge, maxAge, minHour, maxHour, days, rating, reviewsCount, isEditorLink, isShortCard, ...props }: Props): JSX.Element => {
	const router = useRouter();
	const [articleWidth, setArticleWidth] = useState(0);
	const articleRef = useRef(null);
	const [windowWidth, setWindowWidth] = useState(0);

	useEffect(() => {
		if (articleRef !== null)
			setArticleWidth(articleRef.current.getBoundingClientRect().width);

		setWindowWidth(window.innerWidth);
	}, []);

	function getCardHeight() {
		if(isShortCard && windowWidth > 1280)
			return 200;
		else if (windowWidth > 1024)
			return 240;
		else
			return 205;
	}

	return (
		<article
			ref={articleRef}
			className={className + ' rounded-2xl shadow-main cursor-pointer lg:grid grid-cols-[auto_1fr] gap-6'}
			onClick={() => {
				router.push({
					pathname: (isEditorLink ? '/lk/sections/' : '/search/') + 1,
					query: router.query,
				});
			}}
			{...props}
		>
			<div className={'relative lg:h-[240px] ' + (isShortCard && 'xl:h-[200px]')}>
				<div className={'absolute z-10 top-2.5 left-2.5 px-4 py-2 rounded-lg ' + (recordIsOpen ? 'bg-green' : 'bg-red')}>
					<p className='text-white font-semibold text-sm'>
						{recordIsOpen ? 'Запись открыта' : 'Запись закрыта'}
					</p>
				</div>
				<Image
					src={imageSrc}
					width={windowWidth > 1024 ? 300 : articleWidth}
					height={getCardHeight()}
					alt='section'
					className='rounded-[13px] object-cover' />
			</div>
			<div className={'p-4 grid-cols-2 items-center ' + (isShortCard && 'xl:grid')}>
				<div>
					<h2 className='font-bold text-2xl lg:text-[22px]'>
						{title}
					</h2>
					<p className='text-sm mt-2 text-darkGrey'>
						{category}
					</p>
					<p className='text-sm mt-2 text-darkGrey'>
						{address}
					</p>
				</div>
				<div>
					<div className='grid grid-cols-[30px_1fr] items-center gap-2 mt-2.5'>
						<div className='p-1.5 bg-veryLightGrey rounded-md'>
							<PersonIcon />
						</div>
						<p className='font-sm text-darkGrey'>
							{`${minAge}-${maxAge} лет`}
						</p>
					</div>
					<div className='grid grid-cols-[30px_1fr] items-center gap-2 mt-2.5'>
						<div className='p-1.5 bg-veryLightGrey rounded-md'>
							<ClockIcon />
						</div>
						<p className='font-sm text-darkGrey'>
							{`с ${minHour}:00 до ${maxHour}:00 - ${days.join(', ')}`}
						</p>
					</div>
					<div className='grid grid-cols-[30px_1fr] items-center gap-2 mt-2.5'>
						<div className='p-1.5 bg-veryLightGrey rounded-md'>
							<StarIcon />
						</div>
						<p className='font-sm text-darkGrey'>
							{`${rating.toFixed(1)} / 5 • ${reviewsCount} оценка`}
						</p>
					</div>
				</div>
			</div>
		</article>
	);
};

export default SectionCard;
