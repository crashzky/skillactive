import useModal from '../../hooks/useModal';
import Props from './MainLayout.props';
import Link from 'next/link';

import Logo from '../../assets/logo.svg';
import MenuIcon from '../../assets/menu.svg';
import CrossIcon from '../../assets/cross.svg';
import Sidebar from '../Sidebar';

const MainLayout = ({ children, showFooter = true, showHeader = true, addPadding = true }: Props): JSX.Element => {
	const showMenu = useModal((state) => state.showMenu);
	const toggleShowMenu = useModal((state) => state.toggleShowMenu);

	return (
		<>
			{showHeader && (
				<header className='px-4 lg:px-48 lg:py-12 mt-4.5 flex items-center justify-between'>
					<Link href='/'>
						<a>
							<Logo />
						</a>
					</Link>
					{showMenu ? (
						<button onClick={toggleShowMenu}>
							<CrossIcon />
						</button>
					) : (
						<button onClick={toggleShowMenu}>
							<MenuIcon />
						</button>
					)}
				</header>
			)}
			<main className='relative w-screen overflow-x-hidden h-full'>
				<Sidebar />
				<div className={addPadding ? 'px-4' : ''}>
					{children}
				</div>
			</main>
			{showFooter && (
				<footer className='flex justify-between items-center my-10 px-5'>
					<Link href='/'>
						<a>
							<Logo />
						</a>
					</Link>
					<Link href='mailto:info@skillactive.ru'>
						<a className='text-primary font-semibold text-sm'>
							info@skillactive.ru
						</a>
					</Link>
				</footer>
			)}
		</>
	);
};

export default MainLayout;
