import Props from './Button.props';

import FilterIcon from '../../assets/filter.svg';
import TrashIcon from '../../assets/trash.svg';

const Button = ({ className = '', label, variant, ...props }: Props): JSX.Element => {
	switch(variant) {
		case 'primary':
			return (
				<button
					className={className + ' bg-primary w-full rounded-2.5xl py-4.5 text-white font-semibold text-sm'}
					{...props}
				>
					{label}
				</button>
			);
		case 'veryLightGrey':
			return (
				<button
					className={className + ' bg-veryLightGrey w-full rounded-2.5xl py-4.5 text-primary font-semibold text-sm'}
					{...props}
				>
					{label}
				</button>
			);
		case 'outline':
			return (
				<button
					className={
						className + ' ' + `
						bg-veryLightGrey w-full rounded-2.5xl py-4.5 text-primary font-semibold text-sm border-2 border-primary
						`
					}
					{...props}
				>
					{label}
				</button>
			);
		case 'filter':
			return (
				<button
					className={className + ' w-full shadow-main rounded-2.5xl py-4 font-semibold text-sm'}
					{...props}
				>
					<FilterIcon className='inline-block mr-2' />
					Фильтр
				</button>
			);
		case 'red':
			return (
				<button
					className={className + ' w-full bg-red shadow-main rounded-2.5xl py-4 text-white font-semibold text-sm'}
					{...props}
				>
					<TrashIcon className='inline-block mr-2 mb-[2px]' />
					Удалить
				</button>
			);
	}
};

export default Button;
