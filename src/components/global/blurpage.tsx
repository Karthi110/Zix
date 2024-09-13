import React from "react";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
  children: React.ReactNode;
};

const BLurpage = ({ children }: Props) => {
  return (
    <div
      className="h-screen w-full backdrop-blur-[35px] dark:bg-muted/20 bg-muted/60 dark:shadow-2xl dark:shadow-black  mx-auto pt-16 py-2 absolute top-0 right-0 left-0 botton-0 z-[11]"
      id="blur-page"
    >
      <ScrollArea className="w-full h-full px-6">{children}</ScrollArea>
    </div>
  );
};

export default BLurpage;
