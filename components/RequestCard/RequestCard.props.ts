import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	requestId: number;
	createdDate: Date;
	comment: string;
	creatorName: string;
	phone: string;
	isViewed: boolean;
	onToggleActive: () => void;
}

export default Props;
