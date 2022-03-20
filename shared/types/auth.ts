interface ILoginRequest {
	username: string;
	password: string;
}

interface ILoginResponse {
	token: string;
}

interface IRegisterRequest {
	username: string;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
}

interface IRegisterResponse {
	id: number;
	username: string;
	first_name: string;
	last_name: string;
	email: string;
}

interface ICheckStaffResponse {
	status: boolean;
}

interface IRestorationRequest {
	email: string;
}

interface IRestorePasswordRequest {
	uid: string;
	token: string;
	new_password: string;
}

interface IVerifyUserRequest {
	token: string;
	uid: string;
}

export type {
	ILoginRequest,
	ILoginResponse,
	IRegisterRequest,
	IRegisterResponse,
	ICheckStaffResponse,
	IRestorationRequest,
	IRestorePasswordRequest,
	IVerifyUserRequest,
};
