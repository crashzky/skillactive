import axios from 'axios';
import { IFeedCardResponse, IFeedCardRequest, IpatchFeedCardRequest, IFeedCardByIdRequest } from '../types/feed';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const getFeed = (): Promise<IFeedCardResponse[]> => {
	return axios.get('/feed/')
		.then((res) => res.data);
};

const getFeedById = (data: IFeedCardByIdRequest): Promise<IFeedCardResponse> => {
	return axios.get(`/feed/${data.id}`).then((res) => res.data);
};

const postFeed = (data: IFeedCardRequest): Promise<IFeedCardResponse> => {
	return axios.post('/feed/', data, {
		headers: {
			'Authorization': 'Token ' + localStorage.getItem('AUTH_TOKEN'), 
		},
	}).then((res) => res.data);
};

const patchFeed = (data: IpatchFeedCardRequest): Promise<IFeedCardResponse> => {
	return axios.patch(`/feed/${data.id}`, data, {
		headers: {
			'Authorization': 'Token ' + localStorage.getItem('AUTH_TOKEN'), 
		},
	}).then((res) => res.data);
};

const deleteFeed = (data: IFeedCardByIdRequest): Promise<null> => {
	return axios.delete(`/feed/${data.id}`, {
		headers: {
			'Authorization': 'Token ' + localStorage.getItem('AUTH_TOKEN'), 
		},
	}).then((res) => res.data);
};

export {
	getFeed,
	getFeedById,
	postFeed,
	patchFeed,
	deleteFeed,
};
