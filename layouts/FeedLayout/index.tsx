import useFeed from '../../hooks/useFeed';
import MainLayout from '../MainLayout';
import Props from './FeedLayout.props';

const FeedLayout = ({ children }: Props): JSX.Element => {
	const MENU_ITEMS = ['Подборки', 'Мероприятия', 'Статьи'];

	const selectedMenuItem = useFeed((state) => state.selectedMenuItem);
	const setSelectedMenuItem = useFeed((state) => state.setSelectedMenuItem);

	return (
		<MainLayout>
			<h1 className='font-bold text-3.5xl mt-5'>
				Лента
			</h1>
			<div className='flex gap-3 overflow-x-scroll mb-4'>
				{MENU_ITEMS.map((i, num) => (
					<button
						key={num}
						className={'font-bold text-xl '
						+ (selectedMenuItem === num ? 'text-primary' : 'text-lightGrey')}
						onClick={() => setSelectedMenuItem(num)}
					>
						{i}
					</button>
				))}
			</div>
			{children}
		</MainLayout>
	);
};

export default FeedLayout;
