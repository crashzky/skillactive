import useModal from '../../hooks/useModal';
import Props from './WithModalLayout.props';

const WithModalLayout = ({ children, modal }: Props): JSX.Element => {
	const showModal = useModal((state) => state.showModal);
	const toggleShowModal = useModal((state) => state.toggleShowModal);

	return (
		<div
			className={'relative ' + (showModal && 'w-screen h-screen overflow-hidden')}
			onKeyDown={(e) => {
				if(e.code === 'Escape')
					toggleShowModal();
			}}
			tabIndex={0}
		>
			{showModal && (
				<div className='absolute z-10 w-full h-full bg-black opacity-20'></div>
			)}
			{showModal && (
				<div className='absolute w-full h-full z-20 flex justify-center items-center'>
					<div className='bg-white w-full h-full p-4 md:p-6 md:w-auto md:h-auto md:rounded-2.5xl'>
						{modal}
					</div>
				</div>
			)}
			{children}
		</div>
	);
};

export default WithModalLayout;
