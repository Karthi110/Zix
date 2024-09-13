import BLurpage from "@/components/global/blurpage";
import MediaComponent from "@/components/media";
import { getMedia } from "@/lib/queries";
import React from "react";

type Props = {
  params: { subaccountId: string };
};

const MediaPage = async ({ params }: Props) => {
  const data = await getMedia(params.subaccountId);

  return (
    <BLurpage>
      <MediaComponent data={data} subaccountId={params.subaccountId} />
    </BLurpage>
  );
};

export default MediaPage;
