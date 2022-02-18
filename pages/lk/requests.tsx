import { GetStaticProps } from 'next';
import { useState } from 'react';
import HorizontalMenu from '../../components/HorizontalMenu';
import RequestCard from '../../components/RequestCard';
import MainLayout from '../../layouts/MainLayout';
import withCheckAuthLayout from '../../layouts/withCheckAuthLayout';

const RequestsPage = (): JSX.Element => {
	const [selectedMenuTab, setSelectedMenuTab] = useState(0);
		
	return (
		<MainLayout showFooter={false}>
			<div className='lg:flex justify-between'>
				<h1 className='font-bold text-3xl my-4'>
					Заявки
				</h1>
				<HorizontalMenu
					className='lg:w-[345px]'
					items={['Новые', 'Просмотренные']}
					value={selectedMenuTab}
					onItemChange={setSelectedMenuTab} />
			</div>
			<section className='mt-6'>
				<RequestCard
					className='mb-5'
					requestId={129}
					creatorName='Алёна'
					phone='+7 (922) 603-66-43'
					comment='Очень нужно'
					createdDate={new Date(Date.now())}
					onToggleActive={() => {}}
					isViewed={false} />
				<RequestCard
					requestId={129}
					creatorName='Алёна'
					phone='+7 (922) 603-66-43'
					comment='Очень нужно'
					createdDate={new Date(Date.now())}
					onToggleActive={() => {}}
					isViewed />
			</section>
		</MainLayout>
	);
};

export default withCheckAuthLayout(RequestsPage);

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};