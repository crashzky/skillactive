import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	imageSrc: string;
	title: string;
	description: string;
	phone: string;
	onDelete?: () => void;
	isShortIcon?: boolean;
}

export default Props;
