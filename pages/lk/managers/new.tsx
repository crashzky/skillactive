import { useRouter } from 'next/router';
import EditManagerLayout from '../../../layouts/EditManagerLayout';
import withCheckAuthLayout from '../../../layouts/withCheckAuthLayout';

const NewMangerPage = (): JSX.Element => {
	const router = useRouter();

	return (
		<EditManagerLayout
			onSubmit={() => router.push('/lk/managers')} />
	);
};

export default withCheckAuthLayout(NewMangerPage);
