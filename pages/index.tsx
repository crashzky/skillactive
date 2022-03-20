import { GetStaticProps } from 'next';
import { useQuery } from 'react-query';
import ArticleCard from '../components/ArticleCard';
import SearchLayout from '../layouts/SearchLayout';
import { getFeed } from '../shared/api/feed';

const MainPage = (): JSX.Element => {
	const { data } = useQuery('feed', getFeed);

	return (
		<SearchLayout>
			{data && data.sort((a) => {
				if(a.type == 'ARTICLE_SPONSORED' && (new Date(a.date)).getTime() >= (new Date(Date.now())).getTime())
					return 1;
				else
					return -1;
			}).map((i, num) => (
				<ArticleCard
					key={num}
					title={i.title}
					tags={i.tags}
					link={'/articles/' + i.id}
					imageSrc={i.images[0]}
					className='mb-4' />
			))}
		</SearchLayout>
	);
};

export default MainPage;

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};
