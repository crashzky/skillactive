import { useRouter } from 'next/router';
import EditSectionLayout from '../../../layouts/EditSectionLayout';

const NewSectionPage = (): JSX.Element => {
	const router = useRouter();

	return (
		<EditSectionLayout
			onSubmit={() => router.push('/lk/sections')} />
	);
};

export default NewSectionPage;
