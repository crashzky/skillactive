import create from 'zustand';

const useFeed = create((set: (a: any) => any) => ({
	selectedMenuItem: 0,
	setSelectedMenuItem: (newMenuItem: number) => set({
		selectedMenuItem: newMenuItem,
	}),
}));

export default useFeed;
