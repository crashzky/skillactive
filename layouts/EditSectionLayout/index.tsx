import MainLayout from '../MainLayout';
import Props from './EditSectionLayout.props';
import TrashIcon from '../../assets/trash_red.svg';

const EditSectionLayout = ({ images, name, recordingIsOpen, category, description, district, minAge,
	maxAge, timetables, teachers, prices, onSubmit, onDelete }: Props): JSX.Element => {
	const isNewManager = !images && !name && !category && !description && !district
		&& !timetables && !teachers && !prices; 

	return (
		<MainLayout showFooter={false}>
			<div className='flex justify-between items-center mt-4'>
				<h1 className='font-bold text-3xl'>
					{isNewManager ? 'Добавление секции' : 'Редактирование секции'}
				</h1>
				{!isNewManager && (
					<button className='rounded-2xl bg-veryLightGrey p-3' onClick={onDelete}>
						<TrashIcon />
					</button>
				)}
			</div>
		</MainLayout>
	);
};

export default EditSectionLayout;
