import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import EditSectionLayout from '../../../layouts/EditSectionLayout';
import withCheckAuthLayout from '../../../layouts/withCheckAuthLayout';

const NewSectionPage = (): JSX.Element => {
	const router = useRouter();

	return (
		<EditSectionLayout
			onSubmit={() => router.push('/lk/sections')} />
	);
};

export default withCheckAuthLayout(NewSectionPage);

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};
