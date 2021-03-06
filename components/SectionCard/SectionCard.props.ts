import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	cardId: number;
	isEditorLink?: boolean;
	title: string;
	imageSrc: string;
	recordIsOpen: boolean; 
	category: string;
	address: string;
	minAge: number;
	maxAge: number;
	minHour: number;
	maxHour: number;
	days: string[];
	rating: number;
	reviewsCount: number;
	isShortCard?: boolean;
}

export default Props;
