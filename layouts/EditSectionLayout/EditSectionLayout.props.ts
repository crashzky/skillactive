interface Props {
	images?: string[];
	name?: string;
	recordingIsOpen?: boolean;
	category?: string;
	description?: string;
	district?: string;
	minAge?: number;
	maxAge?: number;
	timetables?: ITimetable[];
	teachers?: ITeacher[];
	prices?: IPrice[];
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
	}) => void;
	onDelete?: () => void; 
}

interface ITimetable {
	days: string[];
	minTime: number;
	maxTIme: number;
}

interface ITeacher {
	image: string;
	name: string;
	description: string;
	phone: string;
}

interface IPrice {
	name: string;
	price: number;
}

export default Props;
