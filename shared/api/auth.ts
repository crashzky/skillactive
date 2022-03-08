import axios from 'axios';
import { ILoginRequest, ILoginResponse, IRegisterRequest, IRegisterResponse } from '../types/auth';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const login = (data: ILoginRequest): Promise<ILoginResponse> => {
	return axios.post('/users/auth/', data)
		.then((res) => res.data);
};

const register = (data: IRegisterRequest): Promise<IRegisterResponse> => {
	return axios.post('/users/register/', data)
		.then((res) => res.data);
};

export {
	login,
	register,
};
