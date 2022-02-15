import { useRouter } from 'next/router';
import EditSectionLayout from '../../../layouts/EditSectionLayout';
import withCheckAuthLayout from '../../../layouts/withCheckAuthLayout';

const SectionIdPage = (): JSX.Element => {
	const router = useRouter();

	return (
		<EditSectionLayout
			onSubmit={() => router.push('/lk/sections')}
			images={['/DEV_ONLY.jpg']}
			name='Футболика'
			recordingIsOpen
			category='Футбол'
			description='Лучший футбол у нас'
			district='Центр'
			minAge={10}
			maxAge={17}
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
			]} />
	);
};

export default withCheckAuthLayout(SectionIdPage);
