interface IOrganizationResponse {
	name: string;
	owner: number;
	managers: number[];
}

interface IPatchOrganizationRequest {
	name?: string;
	managers?: number[];
}

interface IUserInfoResponse {
	owner: {
		id: number;
		username: string;
		first_name: string;
		last_name: string;
		email: string;
	};
	creation_date: string;
	profile_photo: string | null;
}

interface IUserActionRequest {
	id: number;
}

export type {
	IOrganizationResponse,
	IPatchOrganizationRequest,
	IUserActionRequest,
	IUserInfoResponse,
};
