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

const SectionInfoPage = (): JSX.Element => {
	const [screenWidth, setScreenWidth] = useState(0);

	const showModal = useModal((state) => state.showModal);
	const toggleShowModal = useModal((state) => state.toggleShowModal);
	const [isSubmit, setIsSubmit] = useState(false);

	useEffect(() => {
		setScreenWidth(window.innerWidth);

		if(showModal)
			toggleShowModal();
	}, []);

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
				<div className='mt-3 relative'>
					<div className={'absolute z-10 top-2.5 left-2.5 px-4 py-2 rounded-lg bg-green'}>
						<p className='text-white font-semibold text-sm'>
							Запись открыта
						</p>
					</div>
					<ImageCarousel>
						<Image src='/DEV_ONLY.jpg' width={screenWidth} height={224} alt='section' className='object-cover' />
						<Image src='/DEV_ONLY.jpg' width={screenWidth} height={224} alt='section' className='object-cover' />
						<Image src='/DEV_ONLY.jpg' width={screenWidth} height={224} alt='section' className='object-cover' />
					</ImageCarousel>
				</div>
				<div className='px-4'>
					<h1 className='font-bold text-2xl mt-3.5'>
						Футболика
					</h1>
					<p className='text-sm text-darkGrey mt-2'>
						Секция футбола
					</p>
					<p className='text-sm text-darkGrey mt-2'>
						Красноармейская 27 
					</p>
					<div className='grid grid-cols-[30px_1fr] items-center gap-2 mt-2.5'>
						<div className='p-1.5 bg-veryLightGrey rounded-md'>
							<PersonIcon />
						</div>
						<p className='font-sm text-darkGrey'>
							6-12 лет
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
							4,5 / 5 • 21 оценка
						</p>
					</div>
					<p className='text-sm mt-6'>
						Наша учебная программа разработана ведущими научными сотрудниками НГУ им.
						П.Ф. Лесгафта в соответствии со стандартами образования детей
						младшего возраста (от 3 лет). Ваш ребёнок будет учиться в спортивной
						секции по плану его возрастной группы. Занятия детским футболом проходят
						в безопасных условиях под чётким руководством аттестованных тренеров г. Екатеринбург.
					</p>
					<section>
						<h2 className='mt-5 mb-2.5 font-bold text-xl '>
							Преподаватели
							{' '}
							<span className='text-primary'>
								(2)
							</span>
						</h2>
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
					</section>
					<section>
						<h2 className='mt-5 mb-2.5 font-bold text-xl '>
							Занятие на карте
						</h2>
						<YMaps>
							<Map className='mt-4 w-full h-44 rounded' defaultState={{ center: [55.75, 37.57], zoom: 9 }}>
								<Placemark geometry={[55.75, 37.57]} />
							</Map>
						</YMaps>
					</section>
					<section>
						<h2 className='mt-5 mb-2.5 font-bold text-xl '>
							Цены
						</h2>
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
					</section>
					<section>
						<h2 className='font-bold text-xl mb-3'>
							Отзывы (20)
						</h2>
						<Input
							className='mb-5'
							placeholder='Написать отзыв'
							blurOnFocus
							onClick={() => {
								setIsSubmit(false);
								toggleShowModal();
							}} />
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
				</div>
			</MainLayout>
			<div className='fixed w-full bottom-5 px-4'>
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
