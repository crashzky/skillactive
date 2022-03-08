interface Props {
	images?: string[];
	title?: string;
	content?: string;
	tags?: string[];
	isAds?: boolean;
	endAdsDate?: Date;
	onSubmit: (values: {
		images: string[];
		title: string;
		content: string;
		tags: string[];
		isAds: boolean;
		endAdsDate?: Date;
	}) => void;
	onDelete?: () => void;
	isDanger?: boolean;
	isLoading?: boolean;
}

export default Props;
