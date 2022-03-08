import Select from 'react-select';
import Props from './InputSelect.props';

const InputSelect = ({ ...props }: Props): JSX.Element => {
	return (
		<Select
			styles={{
				control: (provided) => ({
					...provided,
					border: 'none',
					boxShadow: 'none',
					background: '#F8F8F8',
					borderRadius: '20px',
					padding: '10px',
				}),
				menu: (provided) => ({
					...provided,
					border: 'none',
					boxShadow: 'none',
					background: '#F8F8F8',
					borderRadius: '20px',
					zIndex: 20,
				}),
			}}
			{...props} />
	);
};

export default InputSelect;
