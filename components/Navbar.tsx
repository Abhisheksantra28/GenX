import React from "react";

import { UserButton } from "@clerk/nextjs";
import MobileSiderbar from "./MobileSiderbar";

const Navbar = () => {
  return (
    <div className="flex items-center p-4 ">
      <MobileSiderbar />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
