import React from "react";

import { UserButton } from "@clerk/nextjs";
import MobileSiderbar from "./MobileSiderbar";
import { getAPILimitCount } from "@/lib/apiLimit";
import { checkSubscription } from "@/lib/subscription";

const Navbar = async () => {
  const apiLimitCount = await getAPILimitCount();
  const isPro = await checkSubscription()
  return (
    <div className="flex items-center p-4 ">
      <MobileSiderbar isPro={isPro} apiLimitCount={apiLimitCount}/>
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
