import MainLayout from '../../../layouts/MainLayout';
import withCheckAuthLayout from '../../../layouts/withCheckAuthLayout';
import PlusIcon from '../../../assets/plus.svg';
import { useRouter } from 'next/router';
import SectionCard from '../../../components/SectionCard';
import { GetStaticProps } from 'next';

const SectionsPage = (): JSX.Element => {
	const router = useRouter();

	return (
		<MainLayout showFooter={false}>
			<div className='flex justify-between items-center mt-4'>
				<h1 className='font-bold text-4xl'>
					Занятия
				</h1>
				<button className='rounded-2.5xl p-3 bg-veryLightGrey' onClick={() => router.push('/lk/sections/new')}>
					<PlusIcon />
				</button>
			</div>
			<section className='mt-4'>
				<SectionCard
					isShortCard
					isEditorLink
					className='mb-6'
					title='Футболика'
					imageSrc='/DEV_ONLY.jpg'
					category='Секция футбола'
					address='Красноармейская 27'
					recordIsOpen
					minAge={6}
					maxAge={12}
					minHour={18}
					maxHour={20}
					days={['Вт', 'Чт', 'Сб']}
					rating={4.5}
					reviewsCount={21} />
				<SectionCard
					isShortCard
					isEditorLink
					className='mb-6'
					title='Футболика'
					imageSrc='/DEV_ONLY.jpg'
					category='Секция футбола'
					address='Красноармейская 27'
					recordIsOpen
					minAge={6}
					maxAge={12}
					minHour={18}
					maxHour={20}
					days={['Вт', 'Чт', 'Сб']}
					rating={4.5}
					reviewsCount={21} />
				<SectionCard
					isShortCard
					isEditorLink
					className='mb-6'
					title='Футболика'
					imageSrc='/DEV_ONLY.jpg'
					category='Секция футбола'
					address='Красноармейская 27'
					recordIsOpen
					minAge={6}
					maxAge={12}
					minHour={18}
					maxHour={20}
					days={['Вт', 'Чт', 'Сб']}
					rating={4.5}
					reviewsCount={21} />
			</section>
		</MainLayout>	
	);
};

export default withCheckAuthLayout(SectionsPage);

export const getStaticProps: GetStaticProps = async () => {
	return {
		props: {},
	};
};
