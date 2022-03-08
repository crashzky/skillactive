import create from 'zustand';

const useComment = create((set: ((a: any) => any)) => ({
	replyTo: null,

	setReplyTo: (newValue: number | null) => set({
		replyTo: newValue,
	}),
}));

export default useComment;
