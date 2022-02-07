import Props from './ArticleLayout.props';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Comment from '../../components/Comment';
import Input from '../../components/Input';

import CommentIcon from '../../assets/card/comment.svg';
import LikeIcon from '../../assets/card/ike.svg';
import LikeActiveIcon from '../../assets/card/like_active.svg';

const ArticleLayout = ({ children }: Props): JSX.Element => {
	const [imageWidth, setImageWidth] = useState(0);
	const imageRef = useRef(null);

	useEffect(() => {
		if (imageRef !== null)
			setImageWidth(imageRef.current.getBoundingClientRect().width);
	}, []);

	return (
		<>
			<header ref={imageRef} className='w-full h-[402px] relative'>
				<Image
					src='/DEV_ONLY.jpg'
					width={imageWidth}
					height={402}
					alt='article'
					className='object-cover' />
				<div className='absolute bottom-0 p-4'>
					<div className='flex flex-wrap gap-3.5'>
						<p className='text-white font-bold text-sm'>
							#отдых
						</p>
						<p className='text-white font-bold text-sm'>
							#отдых
						</p>
					</div>
					<h1 className='mt-1.5 font-bold text-2xl text-white'>
						Где покататься на коньках в Екатеринбурге
					</h1>
				</div>
			</header>
			<main className='px-4 pt-5 pb-7.5'>
				<section>
					{children}
					<p className='mt-5 text-grey font-bold text-sm'>
						18 просмотров
					</p>
					<div className='mt-5 w-full flex justify-end gap-5'>
						<CommentIcon />
						<LikeIcon />
					</div>
				</section>
				<section>
					<h2 className='font-bold text-xl mb-3'>
						Комментарии (20)
					</h2>
					<Input
						className='mb-5'
						placeholder='Написать комментарий' />
					<Comment
						title='Анастасия'
						message='Очень понравился тренер, просто теку от него'
						createdTime={new Date(2022, 2, 6, 14, 32)}
						commentRating={104}
						answers={[
							{
								title: 'Евгений',
								createdTime: new Date(2022, 2, 6, 14, 32),
								message: 'Очень понравился тренер, просто теку от него',
							},
						]} />
				</section>
			</main>
		</>
	);
};

export default ArticleLayout;
