"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Zap } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

interface SubscriptionButtonProps {
  isPro: boolean;
}

const SubscriptionButton = ({ isPro = false }: SubscriptionButtonProps) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      console.log(response);

      window.location.href = response.data.url;
    } catch (error) {
      console.log("Billing Error: ", error);
      toast.error("Something went wrong!")
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={onClick} disabled={loading} variant={isPro ? "default" : "pro"}>
      {!isPro && <Zap className="w-4 h-4 mr-2 fill-white" />}
      {isPro ? "Manage Subscription" : " Upgrade"}
    </Button>
  );
};

export default SubscriptionButton;
