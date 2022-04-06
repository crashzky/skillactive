import create from 'zustand';

const useSection = create((set: (a: any) => any) => ({
	selectedSection: null,
	sectionsResult: [],

	setSectionsResult: (newValue) => set({
		sectionsResult: newValue,
	}),
	setSelectedSection: (newValue) => set({
		selectedSection: newValue,
	}),
}));

export default useSection;
