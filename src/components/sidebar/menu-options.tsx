"use client";
import {
  Agency,
  AgencySidebarOption,
  SubAccount,
  SubAccountSidebarOption,
} from "@prisma/client";
import { useEffect, useMemo, useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { ChevronsUpDown, Compass, Menu, PlusCircleIcon } from "lucide-react";
import clsx from "clsx";
import { AspectRatio } from "../ui/aspect-ratio";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import Link from "next/link";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { ScrollArea } from "../ui/scroll-area";
import { useModal } from "@/providers/modal-provider";
import CustomModal from "../global/custom-modal";
import SubAccountDetails from "../forms/subaccount-details";
import { Separator } from "../ui/separator";
import { icons } from "@/lib/constants";
import { usePathname } from "next/navigation";

type Props = {
  defaultOpen?: boolean;
  subAccounts: SubAccount[];
  sidebarOpt: AgencySidebarOption[] | SubAccountSidebarOption[];
  sidebarLogo: string;
  details: any;
  user: any;
  id: string;
};

const MenuOptions = ({
  details,
  id,
  sidebarLogo,
  sidebarOpt,
  subAccounts,
  user,
  defaultOpen,
}: Props) => {
  const { setOpen } = useModal();
  const pathname = usePathname();
  const path = pathname.split("/").at(-1);

  const [isMounted, setIsMounted] = useState(false);

  const openState = useMemo(
    () => (defaultOpen ? { open: true } : {}),
    [defaultOpen]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;

  return (
    <Sheet modal={false} {...openState}>
      <SheetTrigger
        asChild
        className="absolute left-4 top-4 z-[100] md:!hidden flex"
      >
        <Button variant="outline" size={"icon"}>
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent
        showX={!defaultOpen}
        side={"left"}
        className={clsx(
          "bg-background/80 backdrop-blur-xl fixed top-0 border-r-[2px] px-4 py-6 rounded-r-sm",
          {
            "hidden md:inline-block z-0 w-[270px]": defaultOpen,
            "inline-block md:hidden z-[100] w-full": !defaultOpen,
          }
        )}
      >
        <div>
          <AspectRatio ratio={16 / 5}>
            <Image
              src={sidebarLogo}
              alt="sidebar logo"
              fill
              className="rounded-md object-contain"
            />
          </AspectRatio>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="w-full my-4 flex items-center justify-between"
                variant="ghost"
              >
                <div className="flex items-center text-left gap-2">
                  <Compass />
                  <div className="flex flex-col">
                    {details.name}
                    <span className="text-muted-foreground">
                      {details.address}
                    </span>
                  </div>
                </div>
                <div>
                  <ChevronsUpDown size={16} className="text-muted-foreground" />
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-72 h-80 mt-4 z-[200]">
              <ScrollArea className="w-full h-full px-4">
                <Command className="rounded-lg">
                  <CommandInput
                    placeholder="Search Accounts..."
                    className="h-10 py-1"
                  />
                  <CommandList className="pb-16 overflow-hidden">
                    <CommandEmpty> No results found</CommandEmpty>
                    {(user.role === "AGENCY_OWNER" ||
                      user.role === "AGENCY_ADMIN") &&
                      user.Agency && (
                        <CommandGroup heading="Agency">
                          <CommandItem className="!bg-transparent my-2 text-primary broder-[1px] border-border p-2 rounded-md hover:!bg-muted cursor-pointer transition-all">
                            {defaultOpen ? (
                              <div className=" flex flex-col">
                                <Link
                                  href={`/agency/${user.Agency.id}`}
                                  className="flex gap-4 w-full h-full"
                                >
                                  <div className="relative w-16">
                                    <Image
                                      src={user.Agency.agencyLogo}
                                      alt="Agency Logo"
                                      fill
                                      className="rounded-md object-contain"
                                    />
                                  </div>
                                  <div className="flex flex-col flex-1">
                                    {user.Agency.name}
                                    <span className="text-muted-foreground">
                                      {user.Agency.address}
                                    </span>
                                  </div>
                                </Link>
                              </div>
                            ) : (
                              <SheetClose asChild>
                                <Link
                                  href={`/agency/${user?.Agency?.id}`}
                                  className="flex gap-4 w-full h-full"
                                >
                                  <div className="relative w-16">
                                    <Image
                                      src={user?.Agency?.agencyLogo}
                                      alt="Agency Logo"
                                      fill
                                      className="rounded-md object-contain"
                                    />
                                  </div>
                                  <div className="flex flex-col flex-1">
                                    {user?.Agency?.name}
                                    <span className="text-muted-foreground">
                                      {user?.Agency?.address}
                                    </span>
                                  </div>
                                </Link>
                              </SheetClose>
                            )}
                          </CommandItem>
                        </CommandGroup>
                      )}
                    <CommandGroup heading="Accounts">
                      {!!subAccounts
                        ? subAccounts.map((subaccount) => (
                            <CommandItem key={subaccount.id}>
                              {defaultOpen ? (
                                <Link
                                  href={`/subaccount/${subaccount.id}`}
                                  className="flex gap-4 w-full h-full"
                                >
                                  <div className="relative w-16">
                                    <Image
                                      src={subaccount.subAccountLogo}
                                      alt="subaccount Logo"
                                      fill
                                      className="rounded-md object-contain"
                                    />
                                  </div>
                                  <div className="flex flex-col flex-1">
                                    {subaccount.name}
                                    <span className="text-muted-foreground">
                                      {subaccount.address}
                                    </span>
                                  </div>
                                </Link>
                              ) : (
                                <SheetClose asChild>
                                  <Link
                                    href={`/subaccount/${subaccount.id}`}
                                    className="flex gap-4 w-full h-full"
                                  >
                                    <div className="relative w-16">
                                      <Image
                                        src={subaccount.subAccountLogo}
                                        alt="subaccount Logo"
                                        fill
                                        className="rounded-md object-contain"
                                      />
                                    </div>
                                    <div className="flex flex-col flex-1">
                                      {subaccount.name}
                                      <span className="text-muted-foreground">
                                        {subaccount.address}
                                      </span>
                                    </div>
                                  </Link>
                                </SheetClose>
                              )}
                            </CommandItem>
                          ))
                        : "No Accounts"}
                    </CommandGroup>
                  </CommandList>
                  {(user.role === "AGENCY_OWNER" ||
                    user.role === "AGENCY_ADMIN") && (
                    <SheetClose>
                      <Button
                        className="w-full flex gap-2"
                        onClick={() => {
                          setOpen(
                            <CustomModal
                              title="Create a Subaccount"
                              subheading="You can switch between your agency account and the subaccount from the sidebar"
                            >
                              <SubAccountDetails
                                agencyDetails={user.Agency as Agency}
                                userId={user.id as string}
                                userName={user.name}
                              />
                            </CustomModal>
                          );
                        }}
                      >
                        <PlusCircleIcon size={14} />
                        Create Sub Account
                      </Button>
                    </SheetClose>
                  )}
                </Command>
              </ScrollArea>
            </PopoverContent>
          </Popover>
          <p className="text-muted-foreground text-xs mb-2">MENU LINKS</p>
          <Separator className="mb-2" />
          <nav className="relative">
            <Command className="rounded-lg overflow-visible bg-transparent">
              <CommandInput placeholder="search.." className="h-9 py-1 px-2" />
              <CommandList className="py-4 overflow-visible">
                <CommandEmpty>No results found</CommandEmpty>
                <CommandGroup className="overflow-visible">
                  {sidebarOpt.map((siderbarOptions) => {
                    let val;
                    const result = icons.find(
                      (icon) => icon.value === siderbarOptions.icon
                    );
                    if (result) {
                      val = <result.path />;
                    }
                    return (
                      <CommandItem
                        key={siderbarOptions.id}
                        className={clsx(
                          "md:w-[265px] w-full text-xs hover:bg-primary",
                          {
                            "bg-primary font-semibold":
                              siderbarOptions.name.toLowerCase() === path,
                          }
                        )}
                      >
                        <Link
                          href={siderbarOptions.link}
                          className="flex items-center gap-2 rounded-md md:w-full w-[200px]"
                        >
                          {val}
                          <span>{siderbarOptions.name}</span>
                        </Link>
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              </CommandList>
            </Command>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MenuOptions;
