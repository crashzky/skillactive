type ApplicationStatuses = 'NEW' | 'PROCESSING' | 'SEEN';

interface IApplicationCardResponse extends IPostApplicationCardRequest {
	id: number;
	creation_date: string;
}

interface IPostApplicationCardRequest {
	club: number;
	status: ApplicationStatuses;
	name: string;
	phone: string;
	text: string;
}

interface IApplicationsRequest {
	club: number;
}

interface IPatchAppliactionRequest {
	id: number;
	status?: ApplicationStatuses;
	name?: string;
	phone?: string;
	text?: string;
}

export type {
	IApplicationCardResponse,
	IPostApplicationCardRequest,
	IApplicationsRequest,
	IPatchAppliactionRequest,
};
