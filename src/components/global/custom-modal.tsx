"use client";
import { useModal } from "@/providers/modal-provider";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
  title: string;
  subheading: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
};

const CustomModal = ({ children, defaultOpen, subheading, title }: Props) => {
  const { isOpen, setClose } = useModal();
  return (
    <Dialog open={isOpen || defaultOpen} onOpenChange={setClose}>
      <DialogContent className="max-w-2xl w-full h-[550px] bg-card border-none">
        <DialogHeader className="pt-8 text-left overflow-hidden">
          <DialogTitle className="text-2xl font-bold">{title}</DialogTitle>
          <DialogDescription>{subheading}</DialogDescription>
          <ScrollArea className="px-4 w-full h-full">{children}</ScrollArea>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CustomModal;
