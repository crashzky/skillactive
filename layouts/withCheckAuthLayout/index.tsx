import React from 'react';
import Props, { CheckAuthConfig } from './WithCheckAuthLayout.props';

const CheckAuthLayout = ({ children, checkNotAuthed }: Props): JSX.Element => {
	/*const { isError, data } = useQuery('account', getAccountInfo);
	const setAccountInfo = useQueryResponse((state) => state.setAccountInfo);

	const [localStorageObj, setLocalStorageObj] = useState<any>();
	const router = useRouter();

	useEffect(() => {
		setLocalStorageObj(localStorage);
	}, []);

	useEffect(() => {
		if(data)
			setAccountInfo(data);
	}, [data]);

	if(isError || (localStorageObj && !localStorageObj.getItem(LOCALSTORAGE_AUTH_KEY))) {
		localStorageObj.removeItem(LOCALSTORAGE_AUTH_KEY);
		router.push('/login');
		return <></>;
	}
	else*/
	return children;
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
