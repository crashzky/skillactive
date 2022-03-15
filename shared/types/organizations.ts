interface IOrganizationResponse {
	name: string;
	owner: number;
	managers: number[];
}

interface IPatchOrganizationRequest {
	name?: string;
	managers?: number[];
}

export type {
	IOrganizationResponse,
	IPatchOrganizationRequest,
};
