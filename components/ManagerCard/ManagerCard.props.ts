import { DetailedHTMLProps, HTMLAttributes } from 'react';

interface Props extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	managerId: number;
	email: string;
	username: string;
	password: string;
}

export default Props;
