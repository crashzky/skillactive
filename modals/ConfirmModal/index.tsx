import useModal from '../../hooks/useModal';
import Button from '../../components/Button';
import Props from './ConfirmModal.props';

import CrossIcon from '../../assets/cross.svg';

const ConfirmModal = ({ title, className = '', onConfirm, ...props }: Props): JSX.Element => {
	const toggleShowModal = useModal((state) => state.toggleShowModal);

	return (
		<article className={className + ' relative h-full pb-20'} {...props}>
			<div className='mt-4 mb-8 grid items-center grid-cols-[1fr_auto] gap-5'>
				<p className='font-bold text-3.5xl'>
					{title}
				</p>
				<button className='hidden p-1 bg-veryLightGrey rounded-xl md:block' onClick={toggleShowModal}>
					<CrossIcon className='fill-primary' />
				</button>
			</div>
			<div className='absolute w-full bottom-6 md:bottom-0 flex gap-5 flex-col md:flex-row'>
				<Button variant='outline' label='Нет' onClick={toggleShowModal} />
				<Button
					variant='primary'
					label='Да'
					onClick={() => {
						toggleShowModal();
						onConfirm();
					}} />
			</div>
		</article>
	);
};

export default ConfirmModal;
