import BLurpage from "@/components/global/blurpage";
import React from "react";

const PipelinesLayout = ({ children }: { children: React.ReactNode }) => {
  return <BLurpage>{children}</BLurpage>;
};

export default PipelinesLayout;
