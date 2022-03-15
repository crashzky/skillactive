import axios from 'axios';
import { IOrganizationResponse, IPatchOrganizationRequest } from '../types/organizations';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const getCurrentOrganization = (): Promise<IOrganizationResponse> => {
	return axios.get('/organizations/', {
		headers: {
			'Authorization': 'Token ' + localStorage.getItem('AUTH_TOKEN'), 
		},
	}).then((res) => res.data);
};

const getOrganizationsList = (): Promise<IOrganizationResponse[]> => {
	return axios.get('/organizations/list/', {
		headers: {
			'Authorization': 'Token ' + localStorage.getItem('AUTH_TOKEN'), 
		},
	}).then((res) => res.data);
};

const patchOrganization = (data: IPatchOrganizationRequest): Promise<IOrganizationResponse> => {
	return axios.patch('/organizations/', data, {
		headers: {
			'Authorization': 'Token ' + localStorage.getItem('AUTH_TOKEN'), 
		},
	}).then((res) => res.data);
};

export {
	getCurrentOrganization,
	getOrganizationsList,
	patchOrganization,
};
