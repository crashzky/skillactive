import { ReactNode } from 'react';
import { OptionsOrGroups, GroupBase, ActionMeta } from 'react-select';

interface ISelectValue {
	value: string,
	label: string
}

interface Props {
	className?: string;
	options: OptionsOrGroups<unknown, GroupBase<unknown>>;
	isSearchable?: boolean;
	noOptionsMessage?: (obj: {
			inputValue: string;
		}) => ReactNode;
	placeholder?: ReactNode;
	onChange?: (newValue: ISelectValue, actionMeta: ActionMeta<unknown>) => void;
	value?: ISelectValue;
	id?: string;
	instanceId?: string;
}

export default Props;

export type {
	ISelectValue,
};
