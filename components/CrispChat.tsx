"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";
import { CRISP_WEBSITE_ID } from "@/constants";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure(CRISP_WEBSITE_ID);
  }, []);

  return null;
};

export default CrispChat;
