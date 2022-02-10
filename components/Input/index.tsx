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
						+ ' w-full py-4 px-5 rounded-full bg-veryLightGrey outline-none '
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
	}
};

export default Input;
