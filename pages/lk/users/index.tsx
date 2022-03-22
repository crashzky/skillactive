import { useRouter } from 'next/router';
import MainLayout from '../../../layouts/MainLayout';
import PlusIcon from '../../../assets/plus.svg';
import ManagerCard from '../../../components/ManagerCard';
import withCheckAuthLayout from '../../../layouts/withCheckAuthLayout';
import { GetStaticProps } from 'next';
import { useQuery } from 'react-query';
import { getOrganizationsList } from '../../../shared/api/organizations';

const UsersPage = (): JSX.Element => {
	const router = useRouter();

	const { data } = useQuery('organizations_list', getOrganizationsList);

	return (
		<MainLayout showFooter={false}>
			<h1 className='mt-4 font-bold text-4xl'>
				Пользователи
			</h1>
			<section className='mt-4 lg:flex flex-wrap gap-2.5 pb-5'>
				{data && data.map((i, num) => (
					<ManagerCard
						key={num}
						isUser
						managerId={i.owner}
						className='mb-5'
						username={i.name} />
				))}
			</section>
		</MainLayout>
	);
};

export default withCheckAuthLayout(UsersPage);

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};
