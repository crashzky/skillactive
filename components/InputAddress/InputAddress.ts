import { ReactNode } from 'react';
import { ActionMeta } from 'react-select';
import { ISelectValue } from '../InputSelect/InputSelect.props';

interface Props {
	className?: string;
	placeholder?: ReactNode;
	onChange?: (newValue: ISelectValue, actionMeta: ActionMeta<unknown>) => void;
	value?: ISelectValue;
	id?: string;
	instanceId?: string;
}

export default Props;
