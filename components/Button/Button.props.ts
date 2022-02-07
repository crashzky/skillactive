import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	variant: 'primary' | 'veryLightGrey' | 'red' | 'outline' | 'filter';
	label: string;
}

export default Props;
