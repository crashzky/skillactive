import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { getClubs } from '../../shared/api/clubs';
import Props, { CheckAuthConfig } from './WithCheckAuthLayout.props';

const CheckAuthLayout = ({ children, checkNotAuthed }: Props): JSX.Element => {
	const { mutate, isSuccess, isError } = useMutation(getClubs);

	const router = useRouter();

	const [localStorageObj, setLocalStorageObj] = useState<any>();

	useEffect(() => {
		if(localStorage)
			setLocalStorageObj(localStorage);
	}, []);

	useEffect(() => {
		mutate({ owned: true });
	}, [mutate]);

	if(isSuccess && !checkNotAuthed)
		return children;
	else if(isSuccess && checkNotAuthed) {
		router.push('/lk');
		return <></>; 
	}
	else if (isError && checkNotAuthed)
		return children;
	else if (isError) {
		localStorageObj.removeItem('AUTH_TOKEN');
		router.push('/login');
		return <></>;
	}
	else 
		return <></>;
};

function withCheckAuthLayout (Component: React.FC, config?: CheckAuthConfig): React.FC {
	let _config = config ? config : {};

	return function CheckAuth(props): JSX.Element {
		return (
			<CheckAuthLayout
				checkNotAuthed={_config.checkNotAuthed}
			>
				<Component {...props} />
			</CheckAuthLayout>
		);
	};
};

export default withCheckAuthLayout;
