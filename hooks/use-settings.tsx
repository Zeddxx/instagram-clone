import { create } from "zustand"

type SettingStoreProps = {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export const useSettings = create<SettingStoreProps>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}))