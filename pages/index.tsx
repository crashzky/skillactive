import { GetStaticProps } from 'next';
import { useQuery } from 'react-query';
import ArticleCard from '../components/ArticleCard';
import SearchLayout from '../layouts/SearchLayoyt';
import { getFeed } from '../shared/api/feed';

const MainPage = (): JSX.Element => {
	const { data } = useQuery('feed', getFeed);

	return (
		<SearchLayout>
			{data && data.map((i, num) => (
				<ArticleCard
					key={num}
					title={i.title}
					tags={['отдых', 'конки', 'семья', 'каток']}
					link={'/articles/' + i.id}
					imageSrc='/DEV_ONLY.jpg'
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
