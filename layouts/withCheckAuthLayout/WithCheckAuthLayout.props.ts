import { ReactElement } from 'react';

interface Props {
	children: ReactElement;
	checkNotAuthed?: boolean;
}

interface CheckAuthConfig {
	checkNotAuthed?: boolean;
}

export default Props;

export type {
	CheckAuthConfig,
};
