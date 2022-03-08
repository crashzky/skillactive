import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import EditSectionLayout from '../../../layouts/EditSectionLayout';
import withCheckAuthLayout from '../../../layouts/withCheckAuthLayout';
import { postClub } from '../../../shared/api/clubs';

const NewSectionPage = (): JSX.Element => {
	const router = useRouter();

	const { mutate, isLoading, isSuccess, isError } = useMutation(postClub);

	useEffect(() => {
		if(isSuccess)
			router.push('/lk/sections');
	}, [isSuccess, router]);

	return (
		<EditSectionLayout
			isLoading={isLoading}
			isError={isError}
			onSubmit={(values) => {
				mutate({
					title: values.name,
					address: values.address,
					description: values.description,
					price: 0,
					min_age: values.minAge,
					max_age: values.maxAge,
					gender: values.gender,
					opened: values.recordingIsOpen,
					images: [],
					category: values.category,
				});
			}} />
	);
};

export default withCheckAuthLayout(NewSectionPage);

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};
