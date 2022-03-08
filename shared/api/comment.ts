import axios from 'axios';
import { ICommentRequest, ICommentResponse } from '../types/comment';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const sendComment = (data: ICommentRequest): Promise<ICommentResponse> => {
	return axios.post('/comments/', data)
		.then((res) => res.data);
};

export {
	sendComment,
};
