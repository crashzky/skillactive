import CategoryItem from '../../components/CategoryItem';
import useModal from '../../hooks/useModal';
import CATEGORIES from '../../shared/consts/categories';
import Props from './Sidebar.props';

const Sidebar = ({ className = '', ...props }: Props): JSX.Element => {
	const showMenu = useModal((state) => state.showMenu);

	return (
		<aside
			className={className
				+ ' absolute z-10 -right-full h-full w-full bg-white transition-all duration-300 pt-9 '
				+ (showMenu && ' -translate-x-full')}
			{...props}
		>
			{showMenu && (
				<>
					<hr />
					{CATEGORIES.map((i, num) => (
						<>
							<CategoryItem
								key={num + '_item'}
								title={i.title}
								items={i.items} />
							<hr key={num + '_hr'} />
						</>
					))}
				</>
			)}
		</aside>
	);
};

export default Sidebar;
