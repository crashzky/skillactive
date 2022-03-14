import axios from 'axios';
import { ICommentRequest, ICommentResponse, ILikeCommentRequest } from '../types/comment';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const sendComment = (data: ICommentRequest): Promise<ICommentResponse> => {
	return axios.post('/comments/', data)
		.then((res) => res.data);
};

const likeComment = (data: ILikeCommentRequest): Promise<null> => {
	return axios.post(`/comments/${data.id}/like`, data).then((res) => res.data);
};

export {
	sendComment,
	likeComment,
};
