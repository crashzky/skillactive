import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import useModal from '../../../hooks/useModal';
import EditArticleLayout from '../../../layouts/EditArticleLayout';
import withCheckAuthLayout from '../../../layouts/withCheckAuthLayout';
import WithModalLayout from '../../../layouts/WithModalLayout';
import ConfirmModal from '../../../modals/ConfirmModal';
import { deleteFeed, getFeedById, patchFeed } from '../../../shared/api/feed';

const IdArticlePage = (): JSX.Element => {
	const router = useRouter();
	const getFeedMuttation = useMutation(getFeedById);
	const updateMutation = useMutation(patchFeed);
	const deleteMutation = useMutation(deleteFeed);

	const toggleShowModal = useModal((state) => state.toggleShowModal);

	useEffect(() => {
		if(!getFeedMuttation.isSuccess && !getFeedMuttation.isLoading)
			getFeedMuttation.mutate({ id: +router.query.id });
	}, [router, getFeedMuttation]);

	useEffect(() => {
		if(updateMutation.isSuccess || deleteMutation.isSuccess)
			router.push('/lk/articles');
	}, [updateMutation.isSuccess, deleteMutation.isSuccess, router]);

	return (
		<WithModalLayout modal={(
			<ConfirmModal
				title='Подтвердить удаление статьи?'
				onConfirm={() => {
					deleteMutation.mutate({ id: +router.query.id });
				}} />
		)}
		>
			<EditArticleLayout
				key={getFeedMuttation.data && getFeedMuttation.data.title.toString()}
				isDanger={updateMutation.isError || deleteMutation.isError}
				isLoading={updateMutation.isLoading || deleteMutation.isLoading}
				images={getFeedMuttation.data && getFeedMuttation.data.images}
				title={getFeedMuttation.data && getFeedMuttation.data.title}
				content={getFeedMuttation.data && getFeedMuttation.data.text}
				tags={getFeedMuttation.data && getFeedMuttation.data.tags}
				isAds={getFeedMuttation.data && getFeedMuttation.data.type == 'ARTICLE_SPONSORED'}
				endAdsDate={getFeedMuttation.data && new Date(getFeedMuttation.data.date)}
				onSubmit={(values) => {
					updateMutation.mutate({
						id: +router.query.id,
						title: values.title,
						text: values.content,
						type: values.isAds ? 'ARTICLE_SPONSORED' : 'ARTICLE',
						images: values.images,
						date: values.isAds ? values.endAdsDate.toISOString() : (new Date(Date.now())).toISOString(),
						price: 0,
						tags: values.tags,
					});
				}}
				onDelete={toggleShowModal} />
		</WithModalLayout>
	);
};

export default withCheckAuthLayout(IdArticlePage);
