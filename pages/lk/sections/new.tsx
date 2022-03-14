import { GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useMutation } from 'react-query';
import useAddress from '../../../hooks/useAddress';
import EditSectionLayout from '../../../layouts/EditSectionLayout';
import withCheckAuthLayout from '../../../layouts/withCheckAuthLayout';
import { postClub } from '../../../shared/api/clubs';

const NewSectionPage = (): JSX.Element => {
	const router = useRouter();

	const latitude = useAddress((state) => state.latitude);
	const longitude = useAddress((state) => state.longitude);

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
				
				mutate({
					title: values.name,
					address: values.address,
					latitude: latitude,
					longitude: longitude,
					description: values.description,
					min_age: values.minAge,
					max_age: values.maxAge,
					gender: values.gender,
					opened: values.recordingIsOpen,
					images: [],
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
			}} />
	);
};

export default withCheckAuthLayout(NewSectionPage);

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};
