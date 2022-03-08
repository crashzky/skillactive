import { GenderType } from '../../shared/types/clubs';

interface Props {
	images?: string[];
	name?: string;
	recordingIsOpen?: boolean;
	category?: string;
	description?: string;
	district?: string;
	minAge?: number;
	maxAge?: number;
	address?: string;
	timetables?: ITimetable[];
	teachers?: ITeacher[];
	prices?: IPrice[];
	gender?: GenderType,
	onSubmit: (values: {
		images: string[];
		name: string;
		recordingIsOpen: boolean;
		category: string;
		description: string;
		district: string;
		minAge: number;
		maxAge: number;
		timetables: ITimetable[];
		teachers: ITeacher[];
		prices: IPrice[];
		address: string;
		gender: GenderType;
	}) => void;
	onDelete?: () => void; 
	isLoading?: boolean;
	isError?: boolean;
}

interface ITimetable {
	days: number[];
	minTime: number;
	maxTime: number;
}

interface ITeacher {
	image: string;
	name: string;
	description: string;
	phone: string;
}

interface IPrice {
	name: string;
	count: number;
}

export default Props;
