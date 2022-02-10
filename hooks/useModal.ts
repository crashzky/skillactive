import create from 'zustand';

const useModal = create((set: (a: any) => any) => ({
	showMenu: false,
	showModal: false,

	toggleShowMenu: () => set((prev) => ({
		showMenu: !prev.showMenu,
	})),
	toggleShowModal: () => set((prev) => ({
		showModal: !prev.showModal,
	})),
}));

export default useModal;
