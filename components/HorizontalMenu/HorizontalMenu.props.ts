import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	items: string[];
	onItemChange: (value: number) => void;
	value: number;
}

export default Props;
