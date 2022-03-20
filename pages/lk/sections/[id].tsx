import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import useAddress from '../../../hooks/useAddress';
import useModal from '../../../hooks/useModal';
import EditSectionLayout from '../../../layouts/EditSectionLayout';
import withCheckAuthLayout from '../../../layouts/withCheckAuthLayout';
import WithModalLayout from '../../../layouts/WithModalLayout';
import ConfirmModal from '../../../modals/ConfirmModal';
import { deleteClub, getClubById, patchClub } from '../../../shared/api/clubs';

const SectionIdPage = (): JSX.Element => {
	const router = useRouter();
	const getClubMuttation = useMutation(getClubById);
	const updateMutation = useMutation(patchClub);
	const deleteMutation = useMutation(deleteClub);

	const toggleShowModal = useModal((state) => state.toggleShowModal);

	const setLatitude = useAddress((state) => state.setLatitude);
	const setLongitude = useAddress((state) => state.setLongitude);

	const latitude = useAddress((state) => state.latitude);
	const longitude = useAddress((state) => state.longitude);

	useEffect(() => {
		if(!getClubMuttation.isSuccess && !getClubMuttation.isLoading)
			getClubMuttation.mutate({ id: +router.query.id });
	}, [router, getClubMuttation]);

	useEffect(() => {
		if(updateMutation.isSuccess || deleteMutation.isSuccess)
			router.push('/lk/sections');
	}, [updateMutation.isSuccess, deleteMutation.isSuccess, router]);
	
	useEffect(() => {
		if(getClubMuttation.data) {
			setLatitude(getClubMuttation.data.latitude);
			setLongitude(getClubMuttation.data.longitude);
		}
	}, [getClubMuttation.data]);

	let _timetables = [];
	if(getClubMuttation.data) {
		getClubMuttation.data.timetable.forEach((i) => {
			if(_timetables.find((j) => j.minTime === +i.start_time.slice(0, 2) && j.maxTime === +i.end_time.slice(0, 2))) {
				const searchElement = _timetables.find((j) => 
					j.minTime == +i.start_time.slice(0, 2) && j.maxTime == +i.end_time.slice(0, 2)
				);
				const index = _timetables.indexOf(searchElement);
				_timetables[index].days = [..._timetables[index].days, i.day_of_the_week - 1];
			}
			else {
				_timetables.push({
					days: [i.day_of_the_week - 1],
					minTime: +i.start_time.slice(0, 2),
					maxTime: +i.end_time.slice(0, 2),
				});
			}
		});
	}

	return (
		<WithModalLayout modal={(
			<ConfirmModal
				title='Подтвердить удаление секции?'
				onConfirm={() => {
					deleteMutation.mutate({ id: +router.query.id });
				}} />
		)}
		>
			<EditSectionLayout
				key={getClubMuttation.data && getClubMuttation.data.title.toString()}
				isLoading={deleteMutation.isLoading || updateMutation.isLoading}
				isError={deleteMutation.isError || updateMutation.isError}
				images={getClubMuttation.data && getClubMuttation.data.images}
				name={getClubMuttation.data && getClubMuttation.data.title}
				recordingIsOpen={getClubMuttation.data && getClubMuttation.data.opened}
				category={getClubMuttation.data && getClubMuttation.data.category}
				description={getClubMuttation.data && getClubMuttation.data.description}
				district={getClubMuttation.data && getClubMuttation.data.district}
				address={getClubMuttation.data && getClubMuttation.data.address}
				minAge={getClubMuttation.data && getClubMuttation.data.min_age}
				maxAge={getClubMuttation.data && getClubMuttation.data.max_age}
				timetables={_timetables}
				contacts={getClubMuttation.data && getClubMuttation.data.contacts}
				teachers={getClubMuttation.data && getClubMuttation.data.tutors.map((i) => ({
					image: i.photo,
					name: i.name,
					description: i.description,
					phone: i.phone,
				}))}
				prices={getClubMuttation.data && getClubMuttation.data.price.map((i) => ({
					name: i.name,
					count: i.value,
				}))}
				onSubmit={(values) => {
					let _timetables = [];
					values.timetables.forEach((i) => {
						i.days.forEach((j) => {
							_timetables.push({
								day_of_the_week: j + 1,
								start_time: `${i.minTime}:00`,
								end_time: `${i.maxTime}:00`,
							});
						});
					});
					
					updateMutation.mutate({
						id: +router.query.id,
						title: values.name,
						address: values.address,
						latitude: latitude,
						longitude: longitude,
						description: values.description,
						min_age: values.minAge,
						max_age: values.maxAge,
						gender: values.gender,
						opened: values.recordingIsOpen,
						images: values.images,
						category: values.category,
						district: values.district,
						price: values.prices.map((i) => ({
							name: i.name,
							value: i.count,
						})),
						tutors: values.teachers.map((i) => ({
							name: i.name,
							description: i.description,
							photo: i.image,
							phone: i.phone,
						})),
						timetable: _timetables,
						contacts: values.contacts,
					});
				}}
				onDelete={toggleShowModal} />
		</WithModalLayout>
	);
};

export default withCheckAuthLayout(SectionIdPage);
