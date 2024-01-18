import { create } from "zustand";

interface useProModal {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useProModalStore = create<useProModal>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export { useProModalStore };
