import { create } from "zustand";

type CommentTriggerProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useComment = create<CommentTriggerProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
