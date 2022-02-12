import { useRouter } from 'next/router';
import EditManagerLayout from '../../../layouts/EditManagerLayout';
import withCheckAuthLayout from '../../../layouts/withCheckAuthLayout';

const ManagerPage = (): JSX.Element => {
	const router = useRouter();

	return (
		<EditManagerLayout
			email='mail@Mail.ru'
			username='crashzy'
			password='123456'
			onSubmit={() => router.push('/lk/managers')}
			onDelete={() => alert('A')} />
	);
};

export default withCheckAuthLayout(ManagerPage);
