import { useRouter } from 'next/router';
import MainLayout from '../../../layouts/MainLayout';
import PlusIcon from '../../../assets/plus.svg';
import ManagerCard from '../../../components/ManagerCard';
import withCheckAuthLayout from '../../../layouts/withCheckAuthLayout';
import { GetStaticProps } from 'next';
import { useQuery } from 'react-query';
import { getCurrentOrganization, getOrganizationsList } from '../../../shared/api/organizations';

const ManagersPage = (): JSX.Element => {
	const router = useRouter();

	const organizationsListQuery = useQuery('organizations_list', getOrganizationsList);
	const currentOrganizationQuery = useQuery('organization', getCurrentOrganization);

	return (
		<MainLayout showFooter={false}>
			<div className='flex justify-between items-center mt-4'>
				<h1 className='font-bold text-4xl'>
					Менеджеры
				</h1>
				<button className='rounded-2.5xl p-3 bg-veryLightGrey' onClick={() => router.push('/lk/managers/new')}>
					<PlusIcon />
				</button>
			</div>
			<section className='mt-4 lg:flex flex-wrap gap-2.5'>
				{(currentOrganizationQuery.data && organizationsListQuery.data)
				&& currentOrganizationQuery.data.managers.map((i, num) => (
					<ManagerCard
						key={num}
						managerId={i}
						className='mb-5'
						username={organizationsListQuery.data.find((j) => j.owner === i).name} />
				))}
			</section>
		</MainLayout>
	);
};

export default withCheckAuthLayout(ManagersPage);

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};
