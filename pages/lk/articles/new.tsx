import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import EditArticleLayout from '../../../layouts/EditArticleLayout';
import withCheckAuthLayout from '../../../layouts/withCheckAuthLayout';
import { postFeed } from '../../../shared/api/feed';

const NewArticlePage = (): JSX.Element => {
	const router = useRouter();
	const { mutate, isSuccess, isLoading, isError } = useMutation(postFeed);

	useEffect(() => {
		if(isSuccess)
			router.push('/lk/articles');
	}, [isSuccess, router]);

	return (
		<EditArticleLayout
			isLoading={isLoading}
			isDanger={isError}
			onSubmit={(values) => {
				mutate({
					title: values.title,
					text: values.content,
					type: values.isAds ? 'ARTICLE_SPONSORED' : 'ARTICLE',
					images: values.images,
					date: values.isAds ? values.endAdsDate.toISOString() : (new Date(Date.now())).toISOString(),
					price: 0,
					tags: values.tags,
				});
			}} />
	);
};

export default withCheckAuthLayout(NewArticlePage);

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};
