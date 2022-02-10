import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	weeks: number[];
	weeksOnChange: (newValue: number[]) => void;
	hours: number[];
	hourseOnChange: (newValue: number[]) => void;
}

export default Props;
