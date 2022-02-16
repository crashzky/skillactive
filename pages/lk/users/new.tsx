import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import EditManagerLayout from '../../../layouts/EditManagerLayout';
import withCheckAuthLayout from '../../../layouts/withCheckAuthLayout';

const NewUserPage = (): JSX.Element => {
	const router = useRouter();

	return (
		<EditManagerLayout
			isUser
			onSubmit={() => router.push('/lk/users')} />
	);
};

export default withCheckAuthLayout(NewUserPage);

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};
