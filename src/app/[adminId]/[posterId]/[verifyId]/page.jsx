import React from "react";
import AcceptForm from "@/components/AcceptForm";
import { API_URL, site } from "@/config";
import { headers } from "next/headers";

async function Verify({ params }) {
  const { adminId, posterId, verifyId } = await params;
  console.log(adminId, posterId, verifyId);
  const headersList = await headers();
  let content;
  const userAgent = headersList.get("user-agent");
  console.log(userAgent);
  const isMobileView = userAgent.match(
    /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i
  );
  const isTabletView = userAgent.match(
    /Tablet|iPad|Playbook|Silk|Kindle|(Android(?!.*Mobile))/i
  );

  const device = isMobileView ? "phone" : isTabletView ? "ipad" : "desktop";
console.log(device);

  const url = `${API_URL}/${site}/${adminId}/${posterId}/${verifyId}/${device}`;

  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
  if (data?.success !== "exists") {
    content = <div className="col-span-12">No Page found!!</div>;
  }
  if (data?.success == "exists") {
    // content= <div className="col-span-12">Page found!!</div>

    content = <AcceptForm adminId={adminId} posterId={posterId} verifyId={verifyId} sitename={data?.sitename} />;
  }
  return <div>{content}</div>;
}

export default Verify;
