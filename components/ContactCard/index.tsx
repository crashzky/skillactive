import Button from '../Button';
import Link from 'next/link';
import Props from './ContactCard.props';

const ContactCard = ({ className = '', contactType, title, onDelete, isShortCard, ...props }: Props): JSX.Element => {
	function getTitleByType() {
		switch(contactType) {
			case 'EMAIL':
				return 'Email';
			case 'INSTAGRAM':
				return 'Instagram';
			case 'PHONE':
				return 'Телефон';
			case 'VK':
				return 'Вконтакте';
			case 'SITE':
				return 'Сайт';
		}
	}

	function getLinkByType() {
		switch(contactType) {
			case 'EMAIL':
				return 'mailto:' + title;
			case 'INSTAGRAM':
				return 'https://www.instagram.com/' + title;
			case 'PHONE':
				return 'tel:' + title;
			case 'VK':
				return 'https://vk.com/' + title;
			case 'SITE':
				return title;
		}
	}

	return (
		<article className={isShortCard && 'lg:w-80'}>
			<div className={className + ' shadow-main rounded-2.5xl p-4 lg:h-full'} {...props}>
				<h3 className='font-semibold text-sm'>
					{getTitleByType()}
				</h3>
				<Link href={getLinkByType()}>
					<a target='_blank' className='mt-2.5 font-bold text-sm'>
						{title}
					</a>
				</Link>
			</div>
			{onDelete && (
				<Button
					variant='red'
					label='Удалить'
					className='-mt-2 mb-5'
					onClick={onDelete} />
			)}
		</article>
	);
};

export default ContactCard;
