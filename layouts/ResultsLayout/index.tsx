import { useState } from 'react';
import Button from '../../components/Button';
import HorizontalMenu from '../../components/HorizontalMenu';
import useModal from '../../hooks/useModal';
import FilterModal from '../../modals/FilterModal';
import MainLayout from '../MainLayout';
import WithModalLayout from '../WithModalLayout';
import Props from './ResultsLayout.props';

const ResultsLayout = ({ children }: Props): JSX.Element => {
	const [selectedMenuItem, setSelectedMenuItem] = useState(0);
	const toggleShowModal = useModal((state) => state.toggleShowModal);

	return (
		<WithModalLayout modal={
			<FilterModal />
		}
		>
			<MainLayout showFooter={!!children}>
				<HorizontalMenu
					className='mt-7'
					value={selectedMenuItem}
					onItemChange={setSelectedMenuItem}
					items={[
						'Списком',
						'На карте',
					]} />
				<Button className='my-4' variant='filter' label='Фильтр' onClick={toggleShowModal} />
				<section>
					{!children && (
						<p className='font-bold text-lg text-center mt-24'>
							По вашим критериям к сожалению ничего не найдено 😔
							Попробуйте изменить фильтр
						</p>
					)}
					{children}
				</section>
			</MainLayout>
		</WithModalLayout>
	);
};

export default ResultsLayout;
