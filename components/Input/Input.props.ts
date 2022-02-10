import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	variant?: 'classic' | 'range';
	blurOnFocus?: boolean;
	isDanger?: boolean;
}

export default Props;
