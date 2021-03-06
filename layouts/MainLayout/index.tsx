import useModal from '../../hooks/useModal';
import Props from './MainLayout.props';
import Link from 'next/link';

import Logo from '../../assets/logo.svg';
import MenuIcon from '../../assets/menu.svg';
import CrossIcon from '../../assets/cross.svg';
import Sidebar from '../Sidebar';

const MainLayout = ({ children, errorMessage, showFooter = true, showHeader = true, addPadding = true }: Props): JSX.Element => {
	const showMenu = useModal((state) => state.showMenu);
	const toggleShowMenu = useModal((state) => state.toggleShowMenu);

	return (
		<>
			{errorMessage && (
				<div className='fixed z-50 top-0 w-full py-2 bg-red'>
					<p className='text-center text-white font-bold text-lg'>
						{errorMessage}
					</p>
				</div>
			)}
			{showHeader && (
				<header className='px-4 lg:px-48 lg:py-5 mt-4.5 flex items-center justify-between'>
					<Link href='/'>
						<a>
							<Logo />
						</a>
					</Link>
					<div className='flex gap-12'>
						<button className='font-bold text-lg hidden lg:block' onClick={toggleShowMenu}>
							категории
						</button>
						<Link href='/partners'>
							<a className='font-bold text-lg hidden lg:block'>
								партнерам
							</a>
						</Link>
						{showMenu ? (
							<button className='lg:hidden' onClick={toggleShowMenu}>
								<CrossIcon />
							</button>
						) : (
							<button className='lg:hidden' onClick={toggleShowMenu}>
								<MenuIcon />
							</button>
						)}
					</div>
				</header>
			)}
			<main className='relative w-screen overflow-x-hidden h-full'>
				<Sidebar />
				<div className={addPadding ? 'px-4 lg:px-48' : ''}>
					{children}
				</div>
			</main>
			{showFooter && (
				<footer className='flex justify-between items-center my-10 px-5 lg:px-48'>
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
