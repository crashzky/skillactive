import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	variant: 'primary' | 'veryLightGrey' | 'red' | 'outline' | 'filter' | 'withIcon';
	label: string;
	Icon?: React.FC<any>;
}

export default Props;
