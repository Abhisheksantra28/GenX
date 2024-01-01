import { UserButton } from "@clerk/nextjs";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <p>dashboard page</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Dashboard;
