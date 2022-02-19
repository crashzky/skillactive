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
import LikeActiveIcon from '../../assets/card/like_active.svg';
import ArrowLeftIcon from '../../assets/arrow_left.svg';
import Logo from '../../assets/logo.svg';

const ArticlePage = (): JSX.Element => {
	const [imageWidth, setImageWidth] = useState(0);
	const imageRef = useRef(null);

	const router = useRouter();

	const showModal = useModal((state) => state.showModal);
	const toggleShowModal = useModal((state) => state.toggleShowModal);

	useEffect(() => {
		if (!!imageRef.current)
			setImageWidth(imageRef.current.getBoundingClientRect().width);

		if(showModal)
			toggleShowModal();
	}, []);

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
						<ImageCarousel onlyOneSlide>
							<Image
								src='/DEV_ONLY.jpg'
								width={imageWidth}
								height={402}
								className='object-cover lg:rounded-2xl'
								alt='section' />
							<Image
								src='/DEV_ONLY.jpg'
								width={imageWidth}
								height={402}
								className='object-cover lg:rounded-2xl'
								alt='section' />
							<Image
								src='/DEV_ONLY.jpg'
								width={imageWidth}
								height={402}
								className='object-cover lg:rounded-2xl'
								alt='section' />
						</ImageCarousel>
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
					</div>
				</div>
			</header>
			<main className='px-4 lg:px-48 pt-10 pb-7.5'>
				<section>
					<Markdown>
						В Екатеринбурге закрепилась стабильная минусовая температура,
						так что большинство катков города уже работают. Рассказываем,
						где можно покататься и сколько это стоит.

						Каток «Северное сияние» в ЦПКиО (ул. Мичурина, 230) один из самых
						больших в городе. Его площадь — 11 тысяч квадратных метров.
						Тут есть теплый павильон, где можно переодеться, есть камера хранения,
						а также пункты заточки и проката коньков (от 26 до 48 размера).
						На льду стоят фуд-корты и постоянно звучит музыка.

						Выход на лед стоит от 100 до 250 рублей в зависимости от дня недели,
						прокат коньков — 200 рублей в час. Для выхода на лед нужно купить специальную карту.

						Также уже открыт каток в спортивном комплексе «Юность» — один из самых
						больших катков города, площадь которого 15 тысяч квадратных метров.
						Работает каток с 19:00 до 22:00 с понедельника по пятницу,
						с 17:00 до 22:00 в субботу и с 15:00 до 22:00 в воскресенье.

						Выход на лед со своими коньками стоит от 150 до 250 рублей в
						зависимости от возраста и для недели. Прокат коньков — 200 рублей.
						И да, без QR-кода на каток вас не пустят.
					</Markdown>
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
						placeholder='Написать комментарий'
						blurOnFocus
						onClick={() => toggleShowModal()} />
					<Comment
						title='Анастасия'
						message='Очень понравился тренер, просто теку от него'
						createdTime={new Date(2022, 2, 6, 14, 32)}
						commentRating={104}
						className='mb-4'
						answers={[
							{
								title: 'Евгений',
								createdTime: new Date(2022, 2, 6, 14, 32),
								message: 'Очень понравился тренер, просто теку от него',
							},
						]} />
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
