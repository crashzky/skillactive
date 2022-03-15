import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import EditManagerLayout from '../../../layouts/EditManagerLayout';
import withCheckAuthLayout from '../../../layouts/withCheckAuthLayout';
import { getCurrentOrganization, patchOrganization } from '../../../shared/api/organizations';

const ManagerPage = (): JSX.Element => {
	const router = useRouter();

	const currentOrganizationQuery = useQuery('organization', getCurrentOrganization);
	const patchMutation = useMutation(patchOrganization);

	useEffect(() => {
		if(patchMutation.isSuccess)
			router.push('/lk/managers');
	}, [patchMutation.isSuccess, router]);

	function getErrorMessage() {
		switch((patchMutation.error as any).response.status) {
			case 400:
				return 'Пользователя с таким id не существует';
			default:
				return 'Ой, что-то пошло не так. Попробуйте ещё раз позже';
		}
	}

	return (
		<EditManagerLayout
			isLoading={patchMutation.isLoading}
			errorMessage={patchMutation.isError && getErrorMessage()}
			userId={+router.query.id}
			onSubmit={(values) => {
				let _managers = currentOrganizationQuery.data.managers;
				_managers.splice(_managers.indexOf(+router.query.id), 1);
				_managers.push(values.id);
				
				patchMutation.mutate({
					managers: _managers,
				});
			}}
			onDelete={() => {
				let _managers = currentOrganizationQuery.data.managers;
				_managers.splice(_managers.indexOf(+router.query.id), 1);
				
				patchMutation.mutate({
					managers: _managers,
				});
			}} />
	);
};

export default withCheckAuthLayout(ManagerPage);
