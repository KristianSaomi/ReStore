import { useContext } from "react";
import { StoreContext } from "./StoreContext";

export function useStoreContext() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw Error("Ops - we do not seem to be inside the provider");
  }

  return context;
}
