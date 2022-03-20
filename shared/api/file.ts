import axios from 'axios';
import { ISendFileRequest, ISendFileResponse } from '../types/file';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const uploadFile = (data: ISendFileRequest): Promise<ISendFileResponse> => {
	const form = new FormData();
	form.append('media', data.file);

	return axios.put(`/file/multipart/${data.filename}`, form).then((res) => res.data);
};

export {
	uploadFile,
};
