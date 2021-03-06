import Props from './TeacherCard.props';
import Image from 'next/image';
import Button from '../Button';
import normalizeImageUrl from '../../utils/normalizeImgeUrl';

const TeacherCard = ({ className = '', imageSrc, title, description, phone, onDelete, isShortIcon,
	...props }: Props): JSX.Element => {
	return (
		<article className={isShortIcon && 'lg:w-80'}>
			<div
				className={
					className
					+ ' shadow-main rounded-2.5xl p-[5px] pr-8 grid gap-4 grid-cols-[81px_1fr] items-center lg:h-full'}
				{...props}
			>
				<Image
					src={imageSrc ? imageSrc : process.env.NEXT_PUBLIC_API_MEDIA_URL
							+ normalizeImageUrl(process.env.NEXT_PUBLIC_DEFAULT_IMAGE_PATH)}
					width={81}
					height={81}
					alt='teacher'
					className='rounded-2xl object-cover' />
				<div>
					<h3 className='font-bold text-sm'>
						{title}
					</h3>
					<p className='font-semibold text-xs text-darkGrey mb-2'>
						{description}
					</p>
					<span className='rounded-lg bg-veryLightGrey px-3.5 py-[4px] font-semibold text-xs'>
						{phone}
					</span>
				</div>
			</div>
			{onDelete && (
				<Button variant='red' label='Удалить' className='mb-7' onClick={onDelete} />
			)}
		</article>
	);
};

export default TeacherCard;
