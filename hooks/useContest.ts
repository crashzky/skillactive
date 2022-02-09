import create from 'zustand';

const useContest = create((set: ((a: any) => any)) => ({
	isActive: false,
	answers: [],

	setIsActive: (newValue: boolean) => set({
		isActive: newValue,
	}),	
	setAnswers: (newValue: any[]) => set({
		answers: newValue,
	}),
}));

export default useContest;
