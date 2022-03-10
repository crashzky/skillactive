import { GetStaticProps } from 'next';
import { useQuery } from 'react-query';
import ArticleCard from '../../components/ArticleCard';
import FeedLayout from '../../layouts/FeedLayout';
import { getFeed } from '../../shared/api/feed';

const ArticlesPage = (): JSX.Element => {
	const { data } = useQuery('feed', getFeed);

	return (
		<FeedLayout>
			{data && data.sort((a) => {
				if(a.type == 'ARTICLE_SPONSORED' && (new Date(a.date)).getTime() >= (new Date(Date.now())).getTime())
					return 1;
				else
					return -1;
			}).map((i, num) => (
				<ArticleCard
					key={num}
					title={i.title}
					tags={['отдых', 'конки', 'семья', 'каток']}
					link={'/articles/' + i.id}
					imageSrc='/DEV_ONLY.jpg'
					className='mb-4' />
			))}
		</FeedLayout>
	);
};

export default ArticlesPage;

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};
