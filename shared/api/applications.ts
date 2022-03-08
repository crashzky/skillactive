import axios from 'axios';
import { IApplicationCardResponse, IApplicationsRequest, IPatchAppliactionRequest,
	IPostApplicationCardRequest } from '../types/applications';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const getApplications = (data: IApplicationsRequest): Promise<IApplicationCardResponse[]> => {
	return axios.get(`/clubs/${data.club}/applications/`, {
		headers: {
			'Authorization': 'Token ' + localStorage.getItem('AUTH_TOKEN'), 
		},
	}).then((res) => res.data);
};

const postApplication = (data: IPostApplicationCardRequest): Promise<IApplicationCardResponse> => {
	return axios.post(`/clubs/${data.club}/applications/`, data)
		.then((res) => res.data);
};

const patchApplication = (data: IPatchAppliactionRequest): Promise<IApplicationCardResponse> => {
	return axios.patch(`/applications/${data.id}/`, data, {
		headers: {
			'Authorization': 'Token ' + localStorage.getItem('AUTH_TOKEN'), 
		},
	}).then((res) => res.data);
};

export {
	postApplication,
	getApplications,
	patchApplication,
};
