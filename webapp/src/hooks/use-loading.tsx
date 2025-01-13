import { LoadingContext } from "@/contexts/loading-providers";
import { useContext } from "react";

export const useLoading = ()=>{
  const context = useContext(LoadingContext);
    if (!context) {
      throw new Error("useLoader must be used within a LoaderProvider");
    }
    return context;
}