import React from "react";
import Loading from "./loading";
import { Loader2 } from "lucide-react";

const LoadingPage = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <Loader2 className="w-10 h-10 animate-spin text-primary" />
    </div>
  );
};

export default LoadingPage;
