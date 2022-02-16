import { GetStaticProps } from 'next';
import ArticleCard from '../components/ArticleCard';
import SearchLayout from '../layouts/SearchLayoyt';

const MainPage = (): JSX.Element => {
	return (
		<SearchLayout>
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
		</SearchLayout>
	);
};

export default MainPage;

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};
