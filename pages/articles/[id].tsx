import WithModalLayout from '../../layouts/WithModalLayout';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Comment from '../../components/Comment';
import Input from '../../components/Input';
import Markdown from 'markdown-to-jsx';
import useModal from '../../hooks/useModal';

import CommentIcon from '../../assets/card/comment.svg';
import LikeIcon from '../../assets/card/ike.svg';
import LikeActiveIcon from '../../assets/card/like_active.svg';
import CommentModal from '../../modals/CommentModal';

const ArticlePage = (): JSX.Element => {
	const [imageWidth, setImageWidth] = useState(0);
	const imageRef = useRef(null);

	const toggleShowModal = useModal((state) => state.toggleShowModal);

	useEffect(() => {
		if (imageRef !== null)
			setImageWidth(imageRef.current.getBoundingClientRect().width);
	}, []);

	return (
		<WithModalLayout
			modal={
				<CommentModal />
			}
		>
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