import Select from 'react-select';
import Props from './InputSelect.props';

const InputSelect = ({ isDanger, ...props }: Props): JSX.Element => {
	const borderControlStyle = isDanger ? {
		border: '2px red solid',
	} : {
		border: 'none',
	};

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
					...borderControlStyle,
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
