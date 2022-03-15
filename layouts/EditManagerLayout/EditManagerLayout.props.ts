interface Props {
	userId?: number;
	isLoading?: boolean;
	errorMessage?: string;
	onSubmit: (values: {
		id: number;
	}) => void;
	onDelete?: () => void;
}

export default Props;
