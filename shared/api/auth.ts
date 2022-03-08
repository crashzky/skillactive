import axios from 'axios';
import { ICheckStaffResponse, ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from '../types/auth';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const login = (data: ILoginRequest): Promise<ILoginResponse> => {
	return axios.post('/users/auth/', data)
		.then((res) => res.data);
};

const register = (data: IRegisterRequest): Promise<IRegisterResponse> => {
	return axios.post('/users/register/', data)
		.then((res) => res.data);
};

const checkStaff = (): Promise<ICheckStaffResponse> => {
	return axios.get('/users/check_staff/', {
		headers: {
			'Authorization': 'Token ' + localStorage.getItem('AUTH_TOKEN'), 
		},
	}).then((res) => res.data);
};

export {
	login,
	register,
	checkStaff,
};
