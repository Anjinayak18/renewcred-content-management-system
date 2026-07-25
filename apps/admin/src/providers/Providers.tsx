"use client";

import { ReactNode } from "react";
import { Provider } from "react-redux";
import { Toaster } from "sonner";

import { store } from "@/store";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({
  children,
}: ProvidersProps) {
  return (
    <Provider store={store}>
      {children}

      <Toaster
        richColors
        position="top-right"
        closeButton
        expand
        duration={3000}
      />
    </Provider>
  );
}