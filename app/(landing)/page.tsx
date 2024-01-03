import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const LandingPage = () => {
  return (
    <div>
      Landing Page
      <div className="">
        <Link href="/sign-in">
          <Button>Login</Button>
        </Link>
        <Link href="/sign-up">
          <Button>register</Button>
        </Link>
        <Link href="/dashboard">
          <Button>dashboard</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
