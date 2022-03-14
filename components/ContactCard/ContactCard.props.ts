import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ContactType } from '../../shared/types/clubs';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	contactType: ContactType;
	title: string;
	onDelete?: () => void;
	isShortCard?: boolean;
}

export default Props;
