import CategoryItem from '../../components/CategoryItem';
import useModal from '../../hooks/useModal';
import CATEGORIES from '../../shared/consts/categories';
import Props from './Sidebar.props';
import CrossIcon from '../../assets/cross.svg';

const Sidebar = ({ className = '', ...props }: Props): JSX.Element => {
	const showMenu = useModal((state) => state.showMenu);
	const toggleShowMenu = useModal((state) => state.toggleShowMenu);

	return (
		<aside
			className={className
				+ ' absolute z-20 -right-full h-full w-full bg-white transition-all duration-300 pt-9 lg:pt-0 lg:px-48 '
				+ (showMenu && ' -translate-x-full')}
			{...props}
		>
			<div className='flex justify-end'>
				<button onClick={toggleShowMenu}>
					<CrossIcon />
				</button>
			</div>
			{showMenu && (
				<>
					<hr className='lg:hidden' />
					<div className='lg:grid grid-cols-2'>
						{CATEGORIES.map((i, num) => (
							<div key={num}>
								<CategoryItem
									className='rounded-2xl lg:h-full lg:hover:bg-veryLightGrey'
									title={i.title}
									items={i.items} />
								<hr />
							</div>
						))}
					</div>
				</>
			)}
		</aside>
	);
};

export default Sidebar;
