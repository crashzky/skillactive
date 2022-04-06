import WithModalLayout from '../../layouts/WithModalLayout';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Comment from '../../components/Comment';
import Input from '../../components/Input';
import Markdown from 'markdown-to-jsx';
import useModal from '../../hooks/useModal';
import CommentModal from '../../modals/CommentModal';
import { GetStaticPaths, GetStaticProps } from 'next';
import ImageCarousel from '../../components/ImageCarousel';
import Link from 'next/link';
import { useRouter } from 'next/router';

import CommentIcon from '../../assets/card/comment.svg';
import LikeIcon from '../../assets/card/ike.svg';
//import LikeActiveIcon from '../../assets/card/like_active.svg';
import ArrowLeftIcon from '../../assets/arrow_left.svg';
import Logo from '../../assets/logo.svg';
import { useMutation } from 'react-query';
import { getFeedById } from '../../shared/api/feed';
import useComment from '../../hooks/useComment';

const ArticlePage = (): JSX.Element => {
	const [imageWidth, setImageWidth] = useState(0);
	const imageRef = useRef(null);

	const router = useRouter();

	const { mutate, data } = useMutation(getFeedById);

	const showModal = useModal((state) => state.showModal);
	const toggleShowModal = useModal((state) => state.toggleShowModal);
	const setReplyTo = useComment((state) => state.setReplyTo);

	useEffect(() => {
		if (!!imageRef.current)
			setImageWidth(imageRef.current.getBoundingClientRect().width);

		if(showModal)
			toggleShowModal();
	}, []);

	useEffect(() => {
		if(!showModal)
			mutate({ id: +router.query.id });
	}, [showModal, router, mutate]);

	return (
		<WithModalLayout
			modal={
				<CommentModal />
			}
		>
			<header>
				<div className='hidden lg:flex items-center justify-between px-48 py-12 mt-4.5'>
					<Link href='/'>
						<a>
							<Logo />
						</a>
					</Link>
					<div>
						<Link href='/partners'>
							<a className='font-bold text-lg'>
								партнерам
							</a>
						</Link>
					</div>
				</div>
				<div className='lg:px-48'>
					<button
						className='bg-veryLightGrey rounded-md mb-4 p-1.5 text-primary font-semibold hidden lg:block'
						onClick={() => router.push('/articles')}
					>
						<ArrowLeftIcon className='inline-block mr-2.5' />
						назад
					</button>
					<div ref={imageRef} className='w-full h-[402px] relative'>
						{data && (
							<ImageCarousel onlyOneSlide>
								{data.images.map((i, num) => (
									<Image
										key={num}
										src={i}
										width={imageWidth}
										height={402}
										className='object-cover lg:rounded-2xl'
										alt='section' />
								))}
							</ImageCarousel>
						)}
						{(data && !data.images.length) && (
							<Image
								src={process.env.NEXT_PUBLIC_API_URL + process.env.NEXT_PUBLIC_DEFAULT_IMAGE_PATH}
								width={imageWidth}
								height={402}
								className='object-cover lg:rounded-2xl'
								alt='section' />
						)}
						<div className='absolute bottom-0 p-4'>
							<div className='flex flex-wrap gap-3.5'>
								{data && data.tags.map((i, num) => (
									<p key={num} className='text-white font-bold text-sm'>
										#
										{i}
									</p>
								))}
							</div>
							<h1 className='mt-1.5 font-bold text-2xl text-white'>
								{data && data.title}
							</h1>
						</div>
					</div>
				</div>
			</header>
			<main className='px-4 lg:px-48 pt-10 pb-7.5'>
				<section>
					<Markdown>
						{data ? data.text : ''}
					</Markdown>
					<p className='mt-5 text-grey font-bold text-sm'>
						{data && data.views_amount}
						{' '}
						просмотров
					</p>
					<div className='mt-5 w-full flex justify-end gap-5'>
						<CommentIcon />
						<LikeIcon />
					</div>
				</section>
				<section>
					<h2 className='font-bold text-xl mb-3'>
						Комментарии (
						{data && data.comments.length}
						)
					</h2>
					<Input
						className='mb-5'
						placeholder='Написать комментарий'
						blurOnFocus
						onClick={() => {
							toggleShowModal();
							setReplyTo(null);
						}} />
					{data && data.comments.filter((i) => !i.reply_to).map((i, num) => (
						<Comment
							key={num}
							commentId={i.id}
							title={i.name}
							message={i.text}
							createdTime={new Date(i.creation_date)}
							commentRating={i.likes_amount}
							className='mb-4'
							answers={i.replies.map((i) => (
								{
									title: data.comments.find((j) => j.id == i).name,
									createdTime: new Date(data.comments.find((j) => j.id == i).creation_date),
									message: data.comments.find((j) => j.id == i).text,
								}
							))} />
					))}
				</section>
			</main>
		</WithModalLayout>
	);
};

export default ArticlePage;

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
		revalidate: 3600,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: ['/articles/1', '/articles/2'],
		fallback: true,
	};	
};
