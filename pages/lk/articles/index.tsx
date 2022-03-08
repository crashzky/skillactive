import MainLayout from '../../../layouts/MainLayout';
import PlusIcon from '../../../assets/plus.svg';
import { useRouter } from 'next/router';
import ArticleCard from '../../../components/ArticleCard';
import withCheckAuthLayout from '../../../layouts/withCheckAuthLayout';
import { GetStaticProps } from 'next';
import { useQuery } from 'react-query';
import { getFeed } from '../../../shared/api/feed';

const ArticlesPage = (): JSX.Element => {
	const router = useRouter();
	const { data } = useQuery('feed', getFeed);

	return (
		<MainLayout showFooter={false}>
			<div className='flex justify-between items-center mt-4'>
				<h1 className='font-bold text-4xl'>
					Статьи
				</h1>
				<button className='rounded-2.5xl p-3 bg-veryLightGrey' onClick={() => router.push('/lk/articles/new')}>
					<PlusIcon />
				</button>
			</div>
			<section className='mt-5 lg:flex flex-wrap gap-2.5'>
				{data && data.map((i, num) => (
					<ArticleCard
						key={num}
						title={i.title}
						tags={['отдых', 'конки', 'семья', 'каток']}
						link={'/lk/articles/' + i.id}
						imageSrc='/DEV_ONLY.jpg'
						className='mb-4' />
				))}
			</section>
		</MainLayout>
	);
};

export default withCheckAuthLayout(ArticlesPage);

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};
