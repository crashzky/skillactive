import create from 'zustand';

const useModal = create((set: (a: any) => any) => ({
	showMenu: false,
	showModal: false,
	showFilter: false,

	toggleShowMenu: () => set((prev) => ({
		showMenu: !prev.showMenu,
	})),
	toggleShowModal: () => set((prev) => ({
		showModal: !prev.showModal,
	})),
	toggleShowFilter: () => set((prev) => ({
		showFilter: !prev.showFilter,
	})),
}));

export default useModal;
