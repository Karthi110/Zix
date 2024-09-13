"use client";
import { NotificationWithUser } from "@/lib/types";
import { UserButton } from "@clerk/nextjs";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Bell } from "lucide-react";
import { Role } from "@prisma/client";
import { Card } from "../ui/card";
import { Switch } from "../ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ModeToggle } from "./mode-toggle";
import { ScrollArea } from "../ui/scroll-area";

type Props = {
  notifications: NotificationWithUser | [];
  role?: Role;
  className?: string;
  subAccountId?: string;
};

const InfoBar = ({ notifications, subAccountId, className, role }: Props) => {
  const [allNotifications, setAllNotifications] = useState(notifications);
  const [showAll, setShowAll] = useState(true);

  const handleClick = () => {
    if (!showAll) {
      setAllNotifications(notifications);
    } else {
      if (notifications?.length !== 0) {
        setAllNotifications(
          notifications?.filter((item) => item.subAccountId === subAccountId) ??
            []
        );
      }
    }
    setShowAll((prev) => !prev);
  };

  return (
    <>
      <div
        className={twMerge(
          "fixed !z-20 md:left-[270px] left-0 right-0 top-0 px-4 py-2 bg-background/80 backdrop-blur-md flex gap-4 items-center border-b-[2px] rounded-b-sm",
          className
        )}
      >
        <div className="flex items-center gap-3 ml-auto">
          <UserButton afterSignOutUrl="/" />
          <Sheet>
            <SheetTrigger>
              <div className="rounded-full w-7 h-7 bg-primary flex items-center justify-center text-white">
                <Bell size={15} />
              </div>
            </SheetTrigger>
            <SheetContent className="mt-4 mr-4 pr-4 rounded-xl">
              <ScrollArea className="px-2 my-2 w-full h-full">
                <SheetHeader className="text-left">
                  <SheetTitle>Notifications</SheetTitle>
                  <SheetDescription>
                    {(role === "AGENCY_ADMIN" || role === "AGENCY_OWNER") && (
                      <Card className="flex items-center justify-between p-4 m-1">
                        Current Subaccount
                        <Switch onCheckedChange={handleClick} />
                      </Card>
                    )}
                  </SheetDescription>
                </SheetHeader>
                {allNotifications?.map((notification) => (
                  <ScrollArea className="px-2">
                    <div
                      key={notification.id}
                      className="flex flex-col gap-y-2 mb-1 text-ellipsis border rounded-md p-2"
                    >
                      <div className="flex gap-2">
                        <Avatar>
                          <AvatarImage
                            src={notification.User.avatarUrl}
                            alt="Profile Picture"
                          />
                          <AvatarFallback className="bg-primary">
                            {notification.User.name.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <p className="text-sm">
                            <span className="font-semibold">
                              {notification.notification.split("|")[0]}
                            </span>
                            <span className="text-muted-foreground">
                              {notification.notification.split("|")[1]}
                            </span>
                            <span className="font-semibold">
                              {notification.notification.split("|")[2]}
                            </span>
                          </p>
                          <small className="text-xs text-muted-foreground">
                            {new Date(
                              notification.createdAt
                            ).toLocaleDateString()}
                          </small>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                ))}
                {allNotifications?.length === 0 && (
                  <div
                    className="flex items-center justify-center text-muted-foreground"
                    mb-4
                  >
                    You have no notifications.
                  </div>
                )}
              </ScrollArea>
            </SheetContent>
          </Sheet>
          <ModeToggle />
        </div>
      </div>
    </>
  );
};

export default InfoBar;
