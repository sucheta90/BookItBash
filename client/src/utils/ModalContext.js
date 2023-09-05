import React from "react";
import { createContext, useContext } from "react";

import { useDisclosure } from "@nextui-org/react";

// creating modal context
const ModalContext = createContext();

// custom hook to use use ModalContext
export function useModal() {
  return useContext(ModalContext);
}

// ModalProvider  to wrap your entire app.jsx
export function ModalProvider(props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <ModalContext.Provider value={{ isOpen, onOpen, onOpenChange }}>
      {props.children}
    </ModalContext.Provider>
  );
}
