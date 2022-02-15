import { useRouter } from 'next/router';
import EditArticleLayout from '../../../layouts/EditArticleLayout';

const NewArticlePage = (): JSX.Element => {
	const router = useRouter();

	return (
		<EditArticleLayout
			onSubmit={() => router.push('/lk/articles')} />
	);
};

export default NewArticlePage;
