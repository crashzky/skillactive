import axios from 'axios';
import { ICategory } from '../types/categories';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

const getCategories = (): Promise<ICategory[]> => {
	return axios.get('/categories/').then((res) => res.data);
};

export {
	getCategories,
};
