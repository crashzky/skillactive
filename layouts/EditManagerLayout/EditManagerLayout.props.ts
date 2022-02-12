interface Props {
	email?: string;
	username?: string;
	password?: string;
	onSubmit: (values: {
		email: string;
		username: string;
		password: string
	}) => void;
	onDelete?: () => void;
}

export default Props;
