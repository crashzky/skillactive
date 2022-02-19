import Props from './DropdownFilter.props';

import FilterIcon from '../../assets/filter.svg';
import ArrowIcon from '../../assets/arrow_down.svg';
import { useState } from 'react';

const DropdownFilter = ({ className = '', ...props }: Props): JSX.Element => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className={className + ' shadow-main rounded-xl transirion-all duration-200'} {...props}>
			<button
				className='grid grid-cols-[20px_auto_1fr_24px] gap-2 w-full items-center py-5 px-7'
				onClick={() => setIsOpen(!isOpen)}
			>
				<FilterIcon />
				<p className='font-semibold text-sm'>
					Фильтр
				</p>
				<div></div>
				<ArrowIcon className={'transirion-all duration-200 ' + (isOpen && 'rotate-180')} />
			</button>
			{isOpen && (
				<div className='h-[400px]'>
					
				</div>
			)}
		</div>
	);
};

export default DropdownFilter;
