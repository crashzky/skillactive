import MainLayout from '../MainLayout';
import Props from './EditArticleLayout.props';
import TrashIcon from '../../assets/trash_red.svg';

const EditArticleLayout = ({ onDelete }: Props): JSX.Element => {
	const isNewArticle = false;

	return (
		<MainLayout showFooter={false}>
			<div className='flex justify-between items-center mt-4'>
				<h1 className='font-bold text-3xl'>
					{isNewArticle ? 'Создание статьи' : 'Редактирование статьи'}
				</h1>
				{isNewArticle && (
					<button className='rounded-2xl bg-veryLightGrey p-3' onClick={onDelete}>
						<TrashIcon />
					</button>
				)}
			</div>
			
		</MainLayout>
	);
};

export default EditArticleLayout;
