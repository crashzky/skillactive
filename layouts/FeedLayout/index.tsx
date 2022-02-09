import MainLayout from '../MainLayout';
import Props from './FeedLayout.props';

const FeedLayout = ({ children }: Props): JSX.Element => {
	return (
		<MainLayout>
			<h1 className='font-bold text-3.5xl mt-5 mb-2'>
				Лента
			</h1>
			{children}
		</MainLayout>
	);
};

export default FeedLayout;
