import React from "react";
import Navigation from "../../components/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { dark } from "@clerk/themes";

type Props = {};

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <main className=" h-full px-8">
        <Navigation user={user} />
        {children}
      </main>
    </ClerkProvider>
  );
};

export default layout;
