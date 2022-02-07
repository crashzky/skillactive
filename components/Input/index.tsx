import Props from './Input.props';

const Input = ({ className = '', variant = 'classic', ...props }: Props): JSX.Element => {
	switch(variant) {
		case 'classic':
			return (
				<input className={className + ' w-full py-4 px-5 rounded-full bg-veryLightGrey outline-none'} {...props} />
			);
	}
};

export default Input;
