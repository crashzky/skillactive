import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	title: string;
	price: number;
	onDelete?: () => void;
	isShortCard?: boolean;
}

export default Props;
