import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import EditSectionLayout from '../../../layouts/EditSectionLayout';
import withCheckAuthLayout from '../../../layouts/withCheckAuthLayout';
import { deleteClub, getClubById, patchClub } from '../../../shared/api/clubs';

const SectionIdPage = (): JSX.Element => {
	const router = useRouter();
	const getClubMuttation = useMutation(getClubById);
	const updateMutation = useMutation(patchClub);
	const deleteMutation = useMutation(deleteClub);

	useEffect(() => {
		if(!getClubMuttation.isSuccess && !getClubMuttation.isLoading)
			getClubMuttation.mutate({ id: +router.query.id });
	}, [router, getClubMuttation]);

	useEffect(() => {
		if(updateMutation.isSuccess || deleteMutation.isSuccess)
			router.push('/lk/sections');
	}, [updateMutation.isSuccess, deleteMutation.isSuccess, router]);

	return (
		<EditSectionLayout
			key={getClubMuttation.data && getClubMuttation.data.title.toString()}
			isLoading={deleteMutation.isLoading || updateMutation.isLoading}
			isError={deleteMutation.isError || updateMutation.isError}
			images={['/DEV_ONLY.jpg']}
			name={getClubMuttation.data && getClubMuttation.data.title}
			recordingIsOpen={getClubMuttation.data && getClubMuttation.data.opened}
			category='Футбол'
			description={getClubMuttation.data && getClubMuttation.data.description}
			district='Центр'
			minAge={getClubMuttation.data && getClubMuttation.data.min_age}
			maxAge={getClubMuttation.data && getClubMuttation.data.max_age}
			timetables={[
				{
					days: [0, 2, 4],
					minTime: 10,
					maxTime: 17,
				},
			]}
			teachers={[
				{
					image: '/DEV_ONLY.jpg',
					name: 'Артём Пивко',
					description: 'Тренер по футболу',
					phone: '+79221234567',
				},
			]}
			prices={[
				{
					name: 'Первое занятие',
					count: 0,
				},
			]}
			onSubmit={(values) => {
				updateMutation.mutate({
					id: +router.query.id,
					title: values.name,
					address: values.address,
					description: values.description,
					price: 0,
					min_age: values.minAge,
					max_age: values.maxAge,
					gender: values.gender,
					opened: values.recordingIsOpen,
					images: [],
				});
			}}
			onDelete={() => deleteMutation.mutate({ id: +router.query.id })} />
	);
};

export default withCheckAuthLayout(SectionIdPage);
