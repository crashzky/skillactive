import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
	showFooter?: boolean;
	showHeader?: boolean;
	addPadding?: boolean;
	errorMessage?: string;
}

export default Props;
