interface ISendFileRequest {
	filename: string;
	file: File;
}

interface ISendFileResponse {
	path: string;
}

export type {
	ISendFileRequest,
	ISendFileResponse,
};
