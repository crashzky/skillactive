import { ICommentResponse } from './comment';

type GenderType = 'MALE' | 'FEMALE' | 'BOTH';
type ContactType = 'EMAIL' | 'PHONE' | 'SITE' | 'VK' | 'INSTAGRAM' | 'OTHER';

interface IClubCardResponse extends ICreateClubCardRequest {
	id: number;
	searchable_title: string;
	author: number;
	comments: ICommentResponse[];
	category: number;
}

interface IClubsCardRequest {
	age?: number;
	gender?: GenderType;
	max_price?: number;
	min_price?: number;
	owned?: boolean;
	title?: string;
	categories?: string;
	day_of_the_week?: string;
	districts?: string;
	free?: boolean;
	time_start?: string;
	time_end?: string;
}

interface ICreateClubCardRequest {
	title: string;
	address: string;
	latitude: string;
	longitude: string;
	description: string;
	price: IPrice[];
	tutors: ITutor[];
	timetable: ITimetable[];
	contacts: IContact[];
	district: number;
	min_age: number;
	max_age: number;
	gender: GenderType;
	opened: boolean;
	images: string[];
	category: number;
}

interface IPrice {
	name: string;
	value: number;
}

interface ITutor {
	name: string;
	description: string;
	photo: string;
	phone: string;
}

interface IContact {
	type: ContactType;
	value: string;
}

interface ITimetable {
	day_of_the_week: 1 | 2 | 3 | 4 | 5 | 6 | 7;
	start_time: string;
	end_time: string;
}
 
interface IClubByIdRequest {
	id: number;
}

interface IPutClubRequest extends ICreateClubCardRequest {
	id: number;
}

export type {
	GenderType,
	ContactType,
	IClubCardResponse,
	IClubsCardRequest,
	ICreateClubCardRequest,
	IClubByIdRequest,
	IPutClubRequest,
	IContact,
};
