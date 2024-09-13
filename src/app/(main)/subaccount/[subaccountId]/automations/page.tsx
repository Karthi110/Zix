import BLurpage from "@/components/global/blurpage";
import { Timer } from "lucide-react";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <BLurpage>
      <h1 className=" w-full h-full flex items-center justify-center text-3xl gap-4">
        Under Development process ..
        <br />
        We will be right back soon {";)"}
        <Timer size={50} />
      </h1>
    </BLurpage>
  );
};

export default page;
