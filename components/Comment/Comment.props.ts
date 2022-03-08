import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	commentId: number;
	title: string;
	createdTime: Date;
	message: string;
	rating?: number;
	commentRating: number;
	answers: IAnswer[];
}

interface IAnswer {
	title: string;
	message: string;
	createdTime: Date;
}

export default Props;
