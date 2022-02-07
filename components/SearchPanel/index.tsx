import LoupeIcon from '../../assets/loupe.svg';
import Props from './SearchPanel.props';

const SearchPanel = ({ className = '', ...props }: Props): JSX.Element => {
	return (
		<div className={className + ' flex gap-1.5 bg-veryLightGrey rounded-2.5xl py-4.5 px-5'}>
			<LoupeIcon />
			<input className='w-full bg-transparent outline-none' {...props} />
		</div>
	);
};

export default SearchPanel;
