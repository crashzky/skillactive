interface ISuggestionsRequest {
	query: string;
	count?: number;
	language?: 'ru' | 'en';
	locations?: (ILocationsByName | ILocationsByCountry | ILocationsByObjectType | ILocationByFias | ILocationBoost)[];
	locations_geo?: ILocationsGeo[];
	locations_boost?: ILocationBoost[];
	from_bound?: IBound;
	to_bound?: IBound;
}

interface IBound {
	value: 'country' | 'region' | 'area' | 'city' | 'settlement' | 'street' | 'house';
}

interface ILocationBoost {
	kladr_id: number;
}

interface ILocationByFias {
	fias_id: string;
}

interface ILocationsByName{
	region?: string;
	area?: string;
	city?: string;
	settlement?: string;
	street?: string;
}

interface ILocationsByCountry {
	country?: string;
	country_iso_code?: string;
}

interface ILocationsByObjectType {
	region_type_full?: string;
	area_type_full?: string;
	city_type_full?: string;
	settlement_type_full?: string;
	street_type_full?: string;
}

interface ILocationsGeo {
	lat: number;
	lon: number;
	radius_meters?: number;
}

interface ISuggestionsResponse {
	suggestions: ISuggestion[];
}

//https://dadata.ru/api/suggest/address/
interface ISuggestion {
	value: string;
	unrestricted_value: string;
	data: {
		postal_code: number;
		country: string;
		country_iso_code: string;
		federal_district: string;
		region_fias_id: string;
		region_kladr_id: string;
		region_iso_code: string;
		region_with_type: string;
		region_type: string;
		region_type_full: string;
		region: string;

		area_fias_id: string;
		area_kladr_id: string;
		area_with_type: string;
		area_type: string;
		area_type_full: string;
		area: string;

		city_fias_id: string;
		city_kladr_id: string;
		city_with_type: string;
		city_type: string;
		city_type_full: string;
		city: string;
		city_area: string;

		city_district_fias_id: string;
		city_district_with_type: string;
		city_district_type: string;
		city_district_type_full: string;
		city_district: string;

		settlement_fias_id: string;
		settlement_kladr_id: string;
		settlement_with_type: string;
		settlement_type: string;
		settlement_type_full: string;
		settlement: string;

		street_fias_id: string;
		street_kladr_id: string;
		street_with_type: string;
		street_type: string;
		street_type_full: string;
		street: string;

		house_fias_id: string;
		house_kladr_id: string;
		house_type: string;
		house_type_full: string;
		house: string;

		block_type: string;
		block_type_full: string;
		block: string;

		flat_fias_id: string;
		flat_type: string;
		flat_type_full: string;
		flat: string;

		postal_box: string;
		fias_id: string;
		fias_level: 0 | 1 | 3 | 4 | 5| 6 | 7 | 8 | 9 | 65 | 75 | -1;
		
		kladr_id: string;
		geoname_id: string;

		capital_marker: 1 | 2 | 3 | 4 | 0;
		okato: string;
		oktmo: string;
		tax_office: string;
		tax_office_legal: string;
		history_values: string[];

		geo_lat: number;
		geo_lon: number;
		qc_geo: 0 | 1 | 2 | 3 | 4 | 5;
		fias_code: string;
		fias_actuality_state: number;
	}
}

export type {
	ISuggestionsRequest,
	ISuggestionsResponse,
};
