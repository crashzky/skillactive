import Image from 'next/image';
import { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';

import PersonIcon from '../../assets/card/person.svg';
import ClockIcon from '../../assets/card/clock.svg';
import StarIcon from '../../assets/card/star.svg';
import TeacherCard from '../../components/TeacherCard';
import { Map, Placemark, YMaps } from 'react-yandex-maps';
import PriceCard from '../../components/PriceCard';
import Input from '../../components/Input';
import Comment from '../../components/Comment';
import useModal from '../../hooks/useModal';
import WithModalLayout from '../../layouts/WithModalLayout';
import CommentModal from '../../modals/CommentModal';
import SubmitModal from '../../modals/SubmitModal';
import Button from '../../components/Button';
import { GetStaticPaths, GetStaticProps } from 'next';
import ImageCarousel from '../../components/ImageCarousel';
import { useRouter } from 'next/router';

import ArrowLeftIcon from '../../assets/arrow_left.svg';
import { useMutation } from 'react-query';
import { getClubById } from '../../shared/api/clubs';
import useComment from '../../hooks/useComment';

const SectionInfoPage = (): JSX.Element => {
	const [screenWidth, setScreenWidth] = useState(0);
	const [isSubmit, setIsSubmit] = useState(false);

	const showModal = useModal((state) => state.showModal);
	const toggleShowModal = useModal((state) => state.toggleShowModal);
	const setReplyTo = useComment((state) => state.setReplyTo);

	const router = useRouter();

	const { mutate, data } = useMutation(getClubById);

	useEffect(() => {
		setScreenWidth(window.innerWidth);

		if(showModal)
			toggleShowModal();
	}, []);

	useEffect(() => {
		if(!showModal)
			mutate({ id: +router.query.id });
	}, [showModal, router, mutate]);

	function getModal() {
		if(showModal && isSubmit)
			return <SubmitModal />;
		else if(showModal)
			return <CommentModal />;
		else
			return null;
	}

	return (
		<WithModalLayout modal={getModal()}>
			<MainLayout addPadding={false}>
				<div className='lg:px-48'>
					<button
						className='bg-veryLightGrey rounded-md mb-4 p-1.5 text-primary font-semibold hidden lg:block'
						onClick={() => router.back()}
					>
						<ArrowLeftIcon className='inline-block mr-2.5' />
						назад
					</button>
					<div className='mt-3 relative'>
						<div className={'absolute z-10 top-2.5 left-2.5 px-4 py-2 rounded-lg '
							+ (data && data.opened ? 'bg-green' : 'bg-red')}
						>
							<p className='text-white font-semibold text-sm'>
								Запись
								{' '}
								{data && data.opened ? 'открыта' : 'закрыта'}
							</p>
						</div>
						<ImageCarousel>
							<div className='lg:px-1'>
								<Image
									src='/DEV_ONLY.jpg'
									width={screenWidth >= 1024 ? 355 : screenWidth}
									height={211}
									alt='section'
									className='object-cover lg:rounded-2.5xl' />
							</div>
							<div className='lg:px-1'>
								<Image
									src='/DEV_ONLY.jpg'
									width={screenWidth >= 1024 ? 355 : screenWidth}
									height={211}
									alt='section'
									className='object-cover lg:rounded-2.5xl' />
							</div>
							<div className='lg:px-1'>
								<Image
									src='/DEV_ONLY.jpg'
									width={screenWidth >= 1024 ? 355 : screenWidth}
									height={211}
									alt='section'
									className='object-cover lg:rounded-2.5xl' />
							</div>
							<div className='lg:px-1'>
								<Image
									src='/DEV_ONLY.jpg'
									width={screenWidth >= 1024 ? 355 : screenWidth}
									height={211}
									alt='section'
									className='object-cover lg:rounded-2.5xl' />
							</div>
						</ImageCarousel>
					</div>
					<div className='px-4 mt-5'>
						<h1 className='font-bold text-2xl mt-3.5'>
							{data && data.title}
						</h1>
						<p className='text-sm text-darkGrey mt-2'>
							Секция футбола
						</p>
						<p className='text-sm text-darkGrey mt-2'>
							{data && data.address}
						</p>
						<div className='lg:flex justify-between items-center'>
							<div>
								<div className='grid grid-cols-[30px_1fr] items-center gap-2 mt-2.5'>
									<div className='p-1.5 bg-veryLightGrey rounded-md'>
										<PersonIcon />
									</div>
									<p className='font-sm text-darkGrey'>
										{data && data.min_age}
										-
										{data && data.max_age}
										{' '}
										лет
									</p>
								</div>
								<div className='grid grid-cols-[30px_1fr] items-center gap-2 mt-2.5'>
									<div className='p-1.5 bg-veryLightGrey rounded-md'>
										<ClockIcon />
									</div>
									<p className='font-sm text-darkGrey'>
										с 18:00 до 20:00 - Вт, Чт, Сб
									</p>
								</div>
								<div className='grid grid-cols-[30px_1fr] items-center gap-2 mt-2.5'>
									<div className='p-1.5 bg-veryLightGrey rounded-md'>
										<StarIcon />
									</div>
									<p className='font-sm text-darkGrey'>
										{data && data.comments.reduce((prev, curr) => prev + curr.rating, 0).toFixed(1)}
										{' '}
										/ 5 •
										{' '}
										{data && data.comments.length}
										{' '}
										оценок
									</p>
								</div>
							</div>
							<Button
								className='hidden lg:block w-fit px-20'
								variant='primary'
								label='Записаться'
								onClick={() => {
									setIsSubmit(true);
									toggleShowModal();
								}} />
						</div>
						<p className='text-sm mt-6'>
							{data && data.description}
						</p>
						<section>
							<h2 className='mt-5 mb-2.5 font-bold text-xl '>
								Преподаватели
								{' '}
								<span className='text-primary'>
									(2)
								</span>
							</h2>
							<div className='lg:grid grid-flow-col gap-2.5 lg:w-fit'>
								<TeacherCard
									className='mb-2.5'
									imageSrc='/DEV_ONLY.jpg'
									title='Артем Исмагилов Тагирович'
									description='Тренер по футболу'
									phone='+7 (922) 603-66-43' />
								<TeacherCard
									imageSrc='/DEV_ONLY.jpg'
									title='Алена Мусина Дмитриевна'
									description='Тренер по футболу'
									phone='+7 (922) 603-66-43' />
							</div>
						</section>
						<section>
							<h2 className='mt-5 mb-2.5 font-bold text-xl '>
								Занятие на карте
							</h2>
							<YMaps>
								<Map
									className='mt-4 w-full h-44 lg:h-[322px] rounded'
									defaultState={{ center: [55.75, 37.57], zoom: 9 }}
								>
									<Placemark geometry={[55.75, 37.57]} />
								</Map>
							</YMaps>
						</section>
						<section>
							<h2 className='mt-5 mb-2.5 font-bold text-xl '>
								Цены
							</h2>
							<div className='lg:grid grid-flow-col gap-2.5 lg:w-fit mb-5'>
								<PriceCard
									className='mb-2.5'
									title='Первое занятие'
									price={0} />
								<PriceCard
									className='mb-2.5'
									title='Абонемент на 8 занятий, на месяц, 2 раза в неделю'
									price={2500} />
								<PriceCard
									className='mb-5'
									title='Абонемент на 16 занятий, на 2 месяца, 2 раза в неделю'
									price={4700} />
							</div>
						</section>
						<section>
							<h2 className='font-bold text-xl mb-3'>
								Отзывы (
								{data && data.comments.length}
								)
							</h2>
							<Input
								className='mb-5'
								placeholder='Написать отзыв'
								blurOnFocus
								onClick={() => {
									setIsSubmit(false);
									toggleShowModal();
									setReplyTo(null);
								}} />
							{data && data.comments.filter((i) => !i.reply_to).map((i, num) => (
								<Comment
									key={num}
									commentId={i.id}
									title={i.name}
									rating={i.rating}
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
					</div>
				</div>
			</MainLayout>
			<div className='fixed w-full bottom-5 px-4 lg:hidden'>
				<Button
					variant='primary'
					label='Записаться'
					onClick={() => {
						setIsSubmit(true);
						toggleShowModal();
					}} />
			</div>
		</WithModalLayout>
	);
};

export default SectionInfoPage;

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
		revalidate: 3600,
	};
};

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: ['/search/1', '/search/2'],
		fallback: true,
	};	
};
