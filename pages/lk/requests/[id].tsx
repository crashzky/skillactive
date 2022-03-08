import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import HorizontalMenu from '../../../components/HorizontalMenu';
import RequestCard from '../../../components/RequestCard';
import MainLayout from '../../../layouts/MainLayout';
import withCheckAuthLayout from '../../../layouts/withCheckAuthLayout';
import { getApplications, patchApplication } from '../../../shared/api/applications';

const RequestsPage = (): JSX.Element => {
	const [selectedMenuTab, setSelectedMenuTab] = useState(0);

	const router = useRouter();
		
	const applicationsMutation = useMutation(getApplications);
	const patchMutation = useMutation(patchApplication);

	useEffect(() => {
		if(!applicationsMutation.isSuccess && !applicationsMutation.isLoading) {
			applicationsMutation.mutate({
				club: +router.query.id,
			});
		}
	}, [router, applicationsMutation]);

	useEffect(() => {
		if(patchMutation.isSuccess) {
			applicationsMutation.mutate({
				club: +router.query.id,
			});
		}
	}, [patchMutation.isSuccess]);

	return (
		<MainLayout showFooter={false}>
			<div className='lg:flex justify-between'>
				<h1 className='font-bold text-3xl my-4'>
					Заявки
				</h1>
				<HorizontalMenu
					className='lg:w-[345px]'
					items={['Все', 'Новые', 'Просмотренные']}
					value={selectedMenuTab}
					onItemChange={setSelectedMenuTab} />
			</div>
			<section className='mt-6'>
				{applicationsMutation.data
					&& applicationsMutation.data.filter((i) => (i.status === 'NEW' && selectedMenuTab === 1)
						|| (i.status === 'SEEN' && selectedMenuTab === 2) || selectedMenuTab === 0)
						.map((i, num) => (
							<RequestCard
								key={num}
								className='mb-5'
								requestId={i.id}
								creatorName={i.name}
								phone={i.phone}
								comment={i.text}
								createdDate={new Date(i.creation_date)}
								onToggleActive={() => {
									patchMutation.mutate({
										id: i.id,
										status: i.status === 'SEEN' ? 'NEW' : 'SEEN',
									});
								}}
								isViewed={i.status === 'SEEN'} />
						))}
			</section>
		</MainLayout>
	);
};

export default withCheckAuthLayout(RequestsPage);
