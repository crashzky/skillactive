import { ReactNode } from 'react';
import { OptionsOrGroups, GroupBase, ActionMeta } from 'react-select';

interface Props {
	className?: string;
	options: OptionsOrGroups<unknown, GroupBase<unknown>>;
	isSearchable?: boolean;
	noOptionsMessage?: (obj: {
			inputValue: string;
		}) => ReactNode;
	placeholder?: ReactNode;
	onChange?: (newValue: unknown, actionMeta: ActionMeta<unknown>) => void;
	value?: any;
	id?: string;
	instanceId?: string;
}

export default Props;
