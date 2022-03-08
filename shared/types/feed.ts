import { ICommentResponse } from './comment';

type FeedCardType = 'ARTICLE' | 'ARTICLE_SPONSORED' | 'EVENT' | 'EVENT_SPONSORED';

interface IFeedCardResponse extends IFeedCardRequest {
	id: number;
	creation_date: string;
	likes_amount: number;
	views_amount: number;
	comments: ICommentResponse[];
	tags: string[];
}

interface IFeedCardRequest {
	title: string;
	type: FeedCardType;
	text?: string;
	address?: string;
	images: string[];
	date: string;
	tags: string[];
	price: number;
}

interface IpatchFeedCardRequest extends IFeedCardRequest {
	id: number;
}

interface IFeedCardByIdRequest {
	id: number;
}

export type {
	IFeedCardResponse,
	IFeedCardRequest,
	IpatchFeedCardRequest,
	IFeedCardByIdRequest,
};
