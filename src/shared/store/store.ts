import { create } from 'zustand'

type Store = {
	dataIsLoading: boolean
	loadingData: () => void
	finishLoadingData: () => void
}

export const useLoadingStore = create<Store>((set) => ({
	dataIsLoading: false,
	loadingData: () => set(() => ({ dataIsLoading: true })),
	finishLoadingData: () => set(() => ({ dataIsLoading: false })),
}))
