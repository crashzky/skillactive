import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import Select from 'react-select';
import useAddress from '../../hooks/useAddress';
import { getSuggestions } from '../../shared/api/dadata';
import { ISuggestion } from '../../shared/types/dadata';
import { ISelectValue } from '../InputSelect/InputSelect.props';
import Props from './InputAddress';

const InputAddress = ({ isDanger, onChange, ...props }: Props): JSX.Element => {
	const [searchTimeout, setSearchTimeout] = useState(null);
	const [options, setOptions] = useState<ISelectValue[]>([]);
	const [suggestions, setSuggestions] = useState<ISuggestion[]>([]);

	const setLatitude = useAddress((state) => state.setLatitude);
	const setLongitude = useAddress((state) => state.setLongitude);
	
	const { mutate, data } = useMutation(getSuggestions);

	useEffect(() => {
		if(data && data.suggestions.length) {
			setOptions(data.suggestions.map((i) => (
				{
					value: i.unrestricted_value,
					label: i.value,
				}
			)));

			setSuggestions(data.suggestions);
		}
	}, [data]);

	const onInputChange = (value: string) => {
		clearTimeout(searchTimeout);
		setSearchTimeout(setTimeout(() => {
			mutate({
				query: value,
				count: 20,
				locations: [
					{
						city: 'екатеринбург',
					},
				],
			});
		}, 200));
	};

	const borderControlStyle = isDanger ? {
		border: '2px red solid',
	} : {
		border: 'none',
	};

	return (
		<Select
			isSearchable
			styles={{
				control: (provided) => ({
					...provided,
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
			onInputChange={onInputChange}
			options={options}
			onChange={(newValue, actionMeta) => {	
				setLatitude(suggestions.find((i) => i.unrestricted_value == newValue.value).data.geo_lat.toString());
				setLongitude(suggestions.find((i) => i.unrestricted_value == newValue.value).data.geo_lon.toString());
				onChange(newValue, actionMeta);
			}}
			noOptionsMessage={() => 'Начните вводить адрес'}
			{...props} />
	);
};

export default InputAddress;
