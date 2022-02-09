import { useRouter } from 'next/router';
import { useEffect } from 'react';

const ArticlesPage = (): JSX.Element => {
	const router = useRouter();

	useEffect(() => {
		router.push('/feed');
	}, [router]);

	return <></>;
};

export default ArticlesPage;
