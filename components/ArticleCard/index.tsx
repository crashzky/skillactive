import Props from './ArticleCard.props';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import CommentIcon from '../../assets/card/comment.svg';
import LikeIcon from '../../assets/card/ike.svg';
import LikeActiveIcon from '../../assets/card/like_active.svg';

const ArticleCard = ({ className = '', imageSrc, title, tags, link, ...props }: Props): JSX.Element => {
	const [articleWidth, setArticleWidth] = useState(0);
	const articleRef = useRef(null);

	useEffect(() => {
		if (articleRef !== null)
			setArticleWidth(articleRef.current.getBoundingClientRect().width);
	}, []);

	const router = useRouter();

	return (
		<article
			ref={articleRef}
			className={className + ' w-full lg:w-[345px] rounded-2.5xl shadow-main cursor-pointer'}
			{...props}
			onClick={() => router.push(link)}
		>
			<Image
				src={imageSrc}
				width={articleWidth}
				height={179}
				className='object-cover rounded-t-2.5xl'
				alt='article' />
			<div className='p-4'>
				<div className='flex flex-wrap gap-3.5'>
					{tags.map((i, num) => (
						<p key={num} className='text-primary font-bold text-sm'>
							#
							{i}
						</p>
					))}
				</div>
				<h3 className='mt-1.5 font-bold text-xl'>
					{title}
				</h3>
				<div className='w-full mt-1.5 flex justify-end gap-5'>
					<CommentIcon />
					<LikeIcon />
				</div>
			</div>
		</article>
	);
};

export default ArticleCard;
