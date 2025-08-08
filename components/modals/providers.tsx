"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

import LeadCaptureModal from "@/components/modals/lead-capture-modal";
import { useSignInModal } from "@/components/modals/sign-in-modal";

export const ModalContext = createContext<{
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
  setShowLeadCaptureModal: Dispatch<SetStateAction<boolean>>;
}>({
  setShowSignInModal: () => {},
  setShowLeadCaptureModal: () => {},
});

export default function ModalProvider({ children }: { children: ReactNode }) {
  const { SignInModal, setShowSignInModal } = useSignInModal();
  const [showLeadCaptureModal, setShowLeadCaptureModal] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        setShowSignInModal,
        setShowLeadCaptureModal,
      }}
    >
      <SignInModal />
      <LeadCaptureModal
        isOpen={showLeadCaptureModal}
        onClose={() => setShowLeadCaptureModal(false)}
      />
      {children}
    </ModalContext.Provider>
  );
}
