import ArticleCard from '../components/ArticleCard';
import FeedLayout from '../layouts/FeedLayout';

const FeedPage = (): JSX.Element => {
	return (
		<FeedLayout>
			<ArticleCard
				title='Где покататься на коньках в Екатеринбурге'
				tags={['отдых', 'конки', 'семья', 'каток']}
				link='/articles/1'
				imageSrc='/DEV_ONLY.jpg'
				className='mb-4' />
			<ArticleCard
				title='Где покататься на коньках в Екатеринбурге'
				tags={['отдых', 'конки', 'семья', 'каток']}
				link='/articles/1'
				imageSrc='/DEV_ONLY.jpg'
				className='mb-4' />
		</FeedLayout>
	);
};

export default FeedPage;
