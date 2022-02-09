import { useEffect, useRef } from 'react';
import Props from './Textarea.props';
import { DANGER_STYLES } from './Textarea.style';

const Textarea = ({ className = '', value, isDanger, ...props }: Props): JSX.Element => {
	const ref = useRef(null);

	useEffect(() => {
		ref.current.style.height = 'auto';
		ref.current.style.height = (ref.current as any).scrollHeight + 'px';
	}, [value]);

	return (
		<textarea
			ref={ref}
			value={value}
			className={
				className
				+ ' w-full py-4 px-5 rounded-2.5xl bg-veryLightGrey outline-none '
				+ (isDanger && DANGER_STYLES)
			}
			{...props}
		></textarea>
	);
};

export default Textarea;
