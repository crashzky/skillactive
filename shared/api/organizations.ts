import axios from 'axios';
import { IOrganizationResponse, IPatchOrganizationRequest, IUserActionRequest, IUserInfoResponse } from '../types/organizations';

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

const getUserInfo = (data: IUserActionRequest): Promise<IUserInfoResponse> => {
	return axios.get(`/users/${data.id}/profile/`, {
		headers: {
			'Authorization': 'Token ' + localStorage.getItem('AUTH_TOKEN'), 
		},
	}).then((res) => res.data);
};

const deleteUser = (data: IUserActionRequest): Promise<null> => {
	return axios.delete(`/users/${data.id}/profile/`, {
		headers: {
			'Authorization': 'Token ' + localStorage.getItem('AUTH_TOKEN'), 
		},
	}).then((res) => res.data);
};

export {
	getCurrentOrganization,
	getOrganizationsList,
	patchOrganization,
	getUserInfo,
	deleteUser,
};
