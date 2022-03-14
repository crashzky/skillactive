import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
	cords: ICords,
}

interface ICords {
	[index: number]: number[];
}

export default Props;

export type {
	ICords,
};
