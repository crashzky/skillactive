import axios from 'axios';
import { ISuggestionsRequest, ISuggestionsResponse } from '../types/dadata';

const getSuggestions = (data: ISuggestionsRequest): Promise<ISuggestionsResponse> => {
	return axios.post('https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address', data, {
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			'Authorization': 'Token ' + process.env.NEXT_PUBLIC_DADATA_KEY,
		},
	}).then((res) => res.data);
};

export {
	getSuggestions,
};
