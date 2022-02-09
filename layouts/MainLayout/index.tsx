import useModal from '../../hooks/useModal';
import Props from './MainLayout.props';
import Link from 'next/link';

import Logo from '../../assets/logo.svg';
import MenuIcon from '../../assets/menu.svg';
import CrossIcon from '../../assets/cross.svg';
import Sidebar from '../Sidebar';

const MainLayout = ({ children, showFooter = true }: Props): JSX.Element => {
	const showModal = useModal((state) => state.showModal);
	const toggleShowModal = useModal((state) => state.toggleShowModal);

	return (
		<>
			<header className='px-4 mt-4.5 flex items-center justify-between'>
				<Link href='/'>
					<a>
						<Logo />
					</a>
				</Link>
				{showModal ? (
					<button onClick={toggleShowModal}>
						<CrossIcon />
					</button>
				) : (
					<button onClick={toggleShowModal}>
						<MenuIcon />
					</button>
				)}
			</header>
			<main className='relative w-screen overflow-x-hidden h-full'>
				<Sidebar />
				<div className='px-4'>
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
