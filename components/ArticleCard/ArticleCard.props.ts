import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	imageSrc: string;
	title: string;
	tags: string[];
	link: string;
}

export default Props;
