import Props from './TeacherCard.props';
import Image from 'next/image';
import Button from '../Button';

const TeacherCard = ({ className = '', imageSrc, title, description, phone, onDelete, ...props }: Props): JSX.Element => {
	return (
		<>
			<article
				className={className + ' shadow-main rounded-2.5xl p-[5px] grid gap-4 grid-cols-[81px_1fr] items-center'}
				{...props}
			>
				<Image src={imageSrc} width={81} height={81} alt='teacher' className='rounded-2xl object-cover' />
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
			</article>
			{onDelete && (
				<Button variant='red' label='Удалить' className='mt-4 mb-7' onClick={onDelete} />
			)}
		</>
	);
};

export default TeacherCard;
