import axios from 'axios';
import { ISendFileRequest, ISendFileResponse } from '../types/file';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const uploadFile = (data: ISendFileRequest): Promise<ISendFileResponse> => {
	return axios.put(`/file/upload/${data.filename}`, data.file);
};

export {
	uploadFile,
};
