interface ISendFileRequest {
	filename: string;
	file: string | ArrayBuffer;
}

interface ISendFileResponse {
	path: string;
}

export type {
	ISendFileRequest,
	ISendFileResponse,
};
