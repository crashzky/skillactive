import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	label: string;
	imageIds: string[];
	isSingleImage?: boolean;
	setImageIds: (newValue: string[]) => void;
	htmlId: string;
}

export default Props;
