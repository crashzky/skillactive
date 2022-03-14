import create from 'zustand';

const useAddress = create((set: ((a: any) => any)) => ({
	latitude: null,
	longitude: null,

	setLatitude: (newValue: string) => set({
		latitude: newValue,
	}),
	setLongitude: (newValue: string) => set({
		longitude: newValue,
	}),
}));

export default useAddress;
