import { useRouter } from 'next/router';
import EditArticleLayout from '../../../layouts/EditArticleLayout';
import withCheckAuthLayout from '../../../layouts/withCheckAuthLayout';

const IdArticlePage = (): JSX.Element => {
	const router = useRouter();

	return (
		<EditArticleLayout
			images={['0']}
			title='Где покататься на коньках в екатеринбурге'
			content='Это статья'
			tags={['hello', 'aboba']}
			isAds
			endAdsDate={new Date(Date.now())}
			onSubmit={() => router.push('/lk/articles')}
			onDelete={() => router.push('/lk/articles')} />
	);
};

export default withCheckAuthLayout(IdArticlePage);
