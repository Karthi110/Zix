"use client";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useEditor } from "@/providers/editor/editor-provider";
import clsx from "clsx";
import React from "react";
import TabList from "./tabs";
import SettingsTab from "./tabs/settings-tab";
import MediaBucketTab from "./tabs/media-bucket-tab";
import ComponentsTab from "./tabs/components-tab";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type Props = {
  subaccountId: string;
};

const FunnelEditorSidebar = ({ subaccountId }: Props) => {
  const { state, dispatch } = useEditor();

  return (
    <Sheet open={true} modal={false}>
      <Tabs className="w-full " defaultValue="Settings">
        <SheetContent
          showX={false}
          side="right"
          className={clsx(
            "mt-[66px] w-16 z-[80] shadow-none  p-0 focus:border-none transition-all overflow-hidden border-l-2 rounded-l-sm py-2 ",
            { hidden: state.editor.previewMode }
          )}
        >
          <TabList />
        </SheetContent>
        <SheetContent
          showX={false}
          side="right"
          className={clsx(
            "mt-[66px] w-80 z-[40] shadow-none p-0 mr-16 bg-background h-full transition-all overflow-hidden border-l-2 rounded-l-sm ",
            { hidden: state.editor.previewMode }
          )}
        >
          <div className="grid gap-4 h-full pb-20">
            <ScrollArea className="pr-2">
              <TabsContent value="Settings">
                <SheetHeader className="text-left px-4">
                  <SheetTitle>Styles</SheetTitle>
                  <SheetDescription>
                    Show your creativity! You can customize every component as
                    you like.
                  </SheetDescription>
                </SheetHeader>
                <SettingsTab />
              </TabsContent>
              <TabsContent value="Media">
                <MediaBucketTab subaccountId={subaccountId} />
              </TabsContent>
              <TabsContent value="Components">
                <SheetHeader className="text-left p-6 ">
                  <SheetTitle>Components</SheetTitle>
                  <SheetDescription>
                    You can drag and drop components on the canvas
                  </SheetDescription>
                </SheetHeader>
                <ComponentsTab />
              </TabsContent>
            </ScrollArea>
          </div>
        </SheetContent>
      </Tabs>
    </Sheet>
  );
};

export default FunnelEditorSidebar;
