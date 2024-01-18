"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useProModalStore } from "@/hooks/useProModal";
import { Badge } from "./ui/badge";
import { tools } from "@/constants";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Check, Zap } from "lucide-react";
import { Button } from "./ui/button";

const ProModal = () => {
  const proModal = useProModalStore();
  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-1">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade to GenX
              <Badge variant="pro" className="uppercase text-sm py-1">
                Pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 text-zinc-900 font-medium">
            {tools.map((tool) => (
              <Card
                key={tool.href}
                className="p-3 border-black/5 flex items-center justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                    <tool.icon className={`w-6 h-6 ${tool.color}`} />
                  </div>

                  <div className="font-semibold text-sm">{tool.label}</div>
                </div>
                <Check className="text-primary w-6 h-6" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button size="lg" variant="pro" className="w-full">
            <Zap className="w-4 h-4 mr-2 fill-white" />
            Upgrade
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
