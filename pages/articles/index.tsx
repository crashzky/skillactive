import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useFeed from '../../hooks/useFeed';

const ArticlesPage = (): JSX.Element => {
	const setSelectedMenuItem = useFeed((state) => state.setSelectedMenuItem);
	const router = useRouter();

	useEffect(() => {
		setSelectedMenuItem(2);
		router.push('/feed');
	}, []);

	return <></>;
};

export default ArticlesPage;
