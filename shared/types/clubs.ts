import { ICommentResponse } from './comment';

type GenderType = 'MALE' | 'FEMALE' | 'BOTH';

interface IClubCardResponse {
	id: number;
	searchable_title: string;
	author: number;
	title: string;
	address: string;
	description: string;
	price?: number;
	min_age: number;
	max_age: number;
	gender?: GenderType;
	opened?: boolean;
	images?: string[];
	comments: ICommentResponse[];
}

interface IClubsCardRequest {
	age?: number;
	gender?: GenderType;
	max_price?: number;
	min_price?: number;
	owned?: boolean;
	title?: string;
}

interface ICreateClubCardRequest {
	title: string;
	address: string;
	description: string;
	price: number;
	min_age: number;
	max_age: number;
	gender: GenderType;
	opened: boolean;
	images: string[];
}

interface IClubByIdRequest {
	id: number;
}

interface IPutClubRequest extends ICreateClubCardRequest {
	id: number;
}

export type {
	GenderType,
	IClubCardResponse,
	IClubsCardRequest,
	ICreateClubCardRequest,
	IClubByIdRequest,
	IPutClubRequest,
};
