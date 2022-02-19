import create from 'zustand';

const useSection = create((set: (a: any) => any) => ({
	selectedSection: null,

	setSelectedSection: (newValue) => set({
		selectedSection: newValue,
	}),
}));

export default useSection;
