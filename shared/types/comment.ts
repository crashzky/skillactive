type CommentType = 'COMMENT' | 'REVIEW' | 'ANSWER';

interface ICommentResponse {
	id: number;
	anonymous?: boolean;
	user?: number;
	reply_to: number;
	replies: number[];
	feed_item?: number;
	club_item?: number;
	name?: string;
	type?: CommentType;
	title?: string;
	rating?: number;
	text: string;
	images?: string[];
	likes_amount: number;
	creation_date: string;
	deleted: boolean;
}

interface ICommentRequest {
	reply_to?: number;
	feed_item?: number;
	club_item?: number;
	name: string;
	type: CommentType;
	text: string;
	rating?: number;
}

export type {
	ICommentResponse,
	ICommentRequest,
};
