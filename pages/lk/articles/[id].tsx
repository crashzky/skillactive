import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import EditArticleLayout from '../../../layouts/EditArticleLayout';
import withCheckAuthLayout from '../../../layouts/withCheckAuthLayout';
import { deleteFeed, getFeedById, patchFeed } from '../../../shared/api/feed';

const IdArticlePage = (): JSX.Element => {
	const router = useRouter();
	const getFeedMuttation = useMutation(getFeedById);
	const updateMutation = useMutation(patchFeed);
	const deleteMutation = useMutation(deleteFeed);

	useEffect(() => {
		if(!getFeedMuttation.isSuccess && !getFeedMuttation.isLoading)
			getFeedMuttation.mutate({ id: +router.query.id });
	}, [router, getFeedMuttation]);

	useEffect(() => {
		if(updateMutation.isSuccess || deleteMutation.isSuccess)
			router.push('/lk/articles');
	}, [updateMutation.isSuccess, deleteMutation.isSuccess, router]);

	return (
		<EditArticleLayout
			key={getFeedMuttation.data && getFeedMuttation.data.title.toString()}
			isDanger={updateMutation.isError || deleteMutation.isError}
			isLoading={updateMutation.isLoading || deleteMutation.isLoading}
			images={['0']}
			title={getFeedMuttation.data && getFeedMuttation.data.title}
			content={getFeedMuttation.data && getFeedMuttation.data.text}
			tags={['hello', 'aboba']}
			isAds={getFeedMuttation.data && getFeedMuttation.data.type == 'ARTICLE_SPONSORED'}
			endAdsDate={getFeedMuttation.data && new Date(getFeedMuttation.data.date)}
			onSubmit={(values) => {
				updateMutation.mutate({
					id: +router.query.id,
					title: values.title,
					text: values.content,
					type: values.isAds ? 'ARTICLE_SPONSORED' : 'ARTICLE',
					images: [],
					date: values.isAds ? values.endAdsDate.toISOString() : (new Date(Date.now())).toISOString(),
					price: 0,
				});
			}}
			onDelete={() => deleteMutation.mutate({ id: +router.query.id })} />
	);
};

export default withCheckAuthLayout(IdArticlePage);
