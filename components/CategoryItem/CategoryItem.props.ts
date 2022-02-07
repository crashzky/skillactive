import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	title: string;
	items: ICatrgoryItem[];
}

interface ICatrgoryItem {
	title: string;
	link: string;
}

export default Props;
