import { format } from 'date-fns';
import { useRef } from 'react';
import Props from './Input.props';
import { DANGER_STYLES } from './Input.style';

const Input = ({ className = '', variant = 'classic', isDanger, blurOnFocus, ...props }: Props): JSX.Element => {
	const ref = useRef(null);
	
	switch(variant) {
		case 'classic':
			return (
				<input
					ref={ref}
					className={
						className
						+ ' w-full py-4 px-5 rounded-full lg:rounded-2xl bg-veryLightGrey outline-none '
						+ (isDanger && DANGER_STYLES)} 
					onFocus={() => {
						if(blurOnFocus)
							ref.current.blur();
					}}
					{...props} />
			);
		case 'range':
			return (
				<input
					type='range'
					className={className + ' w-full'} 
					{...props} />
			);
		case 'checkbox':
			return (
				<div
					className={
						className
						+ ' w-fit rounded-2.5xl py-3 px-5 grid grid-cols-[auto_1fr] gap-2 items-center '
						+ (props.checked ? 'bg-primary text-white' : 'bg-veryLightGrey')}
				>
					<input
						className='custom-checkbox'
						type='checkbox'
						{...props} />
					<label htmlFor={props.id} className='font-semibold text-sm'>
						{props.placeholder}
					</label>
				</div>
			);
		case 'date':
			return (
				<div
					className={className + ' bg-veryLightGrey rounded-2.5xl w-fit py-3 px-5'}
				>
					<p className='text-sm text-darkGrey mb-px'>
						Продвижение до
					</p>
					<input
						type='date'
						className='bg-transparent mt-px outline-none'
						{...props}
						value={format(props.value as any, 'yyyy-MM-dd')} />
				</div>
			);
	}
};

export default Input;
