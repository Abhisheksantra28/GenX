import React from "react";

import { UserButton } from "@clerk/nextjs";
import MobileSiderbar from "./MobileSiderbar";
import { getAPILimitCount } from "@/lib/apiLimit";

const Navbar = async () => {
  const apiLimitCount = await getAPILimitCount();
  return (
    <div className="flex items-center p-4 ">
      <MobileSiderbar apiLimitCount={apiLimitCount}/>
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
