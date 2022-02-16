import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	tagsValue: string[];
	setTagsValue: (newValue: string[]) => void;
}

export default Props;
