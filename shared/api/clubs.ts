import axios from 'axios';
import { IClubByIdRequest, IClubCardResponse, IClubsCardRequest, ICreateClubCardRequest, IPutClubRequest } from '../types/clubs';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const getClubs = (data: IClubsCardRequest): Promise<IClubCardResponse[]> => {
	const authorizationHeader = data.owned ? {
		'Authorization': 'Token ' + localStorage.getItem('AUTH_TOKEN'), 
	} : {};

	return axios.get('/clubs/', {
		params: data,
		headers: authorizationHeader,
	}).then((res) => res.data);
};

const getClubById = (data: IClubByIdRequest): Promise<IClubCardResponse> => {
	return axios.get(`/clubs/${data.id}/`).then((res) => res.data);
};

const postClub = (data: ICreateClubCardRequest): Promise<IClubCardResponse> => {
	return axios.post('/clubs/', data, {
		headers: {
			'Authorization': 'Token ' + localStorage.getItem('AUTH_TOKEN'), 
		},
	}).then((res) => res.data);
};

const patchClub = (data: IPutClubRequest): Promise<IClubCardResponse> => {
	return axios.patch(`/clubs/${data.id}/`, data, {
		headers: {
			'Authorization': 'Token ' + localStorage.getItem('AUTH_TOKEN'), 
		},
	}).then((res) => res.data);
};

const deleteClub = (data: IClubByIdRequest): Promise<null> => {
	return axios.delete(`/clubs/${data.id}/`, {
		headers: {
			'Authorization': 'Token ' + localStorage.getItem('AUTH_TOKEN'), 
		},
	}).then((res) => res.data);
};

export {
	getClubs,
	getClubById,
	postClub,
	patchClub,
	deleteClub,
};
