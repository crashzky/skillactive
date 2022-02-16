import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import EditArticleLayout from '../../../layouts/EditArticleLayout';
import withCheckAuthLayout from '../../../layouts/withCheckAuthLayout';

const NewArticlePage = (): JSX.Element => {
	const router = useRouter();

	return (
		<EditArticleLayout
			onSubmit={() => router.push('/lk/articles')} />
	);
};

export default withCheckAuthLayout(NewArticlePage);

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};
