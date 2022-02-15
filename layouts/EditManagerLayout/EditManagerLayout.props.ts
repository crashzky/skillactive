interface Props {
	isUser?: boolean;
	email?: string;
	username?: string;
	password?: string;
	userType?: string;
	onSubmit: (values: {
		email: string;
		username: string;
		password: string
	}) => void;
	onDelete?: () => void;
}

export default Props;
