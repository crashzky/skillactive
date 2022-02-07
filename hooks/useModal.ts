import create from 'zustand';

const useModal = create((set: (a: any) => any) => ({
	showModal: false,
	toggleShowModal: () => set((prev) => ({
		showModal: !prev.showModal,
	})),
}));

export default useModal;
