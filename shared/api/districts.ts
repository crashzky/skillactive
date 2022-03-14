import axios from 'axios';
import { IDistrict } from '../types/districts';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const getDistricts = (): Promise<IDistrict[]> => {
	return axios.get('/districts/').then((res) => res.data);
};

export {
	getDistricts,
};
