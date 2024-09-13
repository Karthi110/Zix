import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pricingCards } from "@/lib/constants";
import clsx from "clsx";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="py-6">
      <section className="h-full w-full pt-32 relative flex items-center justify-center flex-col">
        <div className="absolute bottom-0 left-[-32px] right-[-32px] top-[-24px] bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] blur-[2px]" />
        <p className="text-center">Run your agency, in one place</p>
        <div className="bg-gradient-to-r from-primary to-secondary-foreground text-transparent bg-clip-text relative">
          <h1 className=" text-7xl md:text-9xl font-bold text-center">Zix</h1>
          <div className="flex justify-center items-center relative md:mt-[-16px] mt-[-12px]">
            <Image
              src="/assets/preview.png"
              alt="banner"
              height={1100}
              width={1200}
              className=" rounded-2xl border-2 border-muted"
            />
            <div className=" bottom-0 t-[50%]  bg-gradient-to-t dark:from-background left-0 right-0 absolute z-10" />
          </div>
        </div>
      </section>
      <section className="flex justify-center flex-col gap-4 mt-20 items-center">
        <h2 className="text-4xl md:text-6xl text-center font-medium">
          Choose what fits you right
        </h2>
        <p className="text-muted-foreground text-center">
          Our straightforward pricing plans are tailored to meet your needs. If
          {" you're"} not <br />
          ready to commit you can get started for free.
        </p>
        <div className="flex justify-center gap-4 flex-wrap mt-6">
          {/* //WIP:wire up free product */}
          {pricingCards.map((card) => (
            <Card
              key={card.title}
              className={clsx("w-[300px] flex flex-col justify-between", {
                "border-2 border-primary": card.title === "Unlimited Saas",
              })}
            >
              <CardHeader>
                <CardTitle
                  className={clsx("", {
                    "text-muted-foreground": card.title !== "Unlimited Saas",
                  })}
                >
                  {card.title}
                </CardTitle>
                <CardDescription>{card.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-4xl font-bold">{card.price}</span>
                <span className="text-muted-foreground">/m</span>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <div>
                  {card.features.map((feature) => (
                    <div key={feature} className="flex gap-2 items-center">
                      <Check />
                      <p>{feature}</p>
                    </div>
                  ))}
                </div>
                <Link
                  href={`/agency?plan=${card.priceId}`}
                  className={clsx(
                    "w-full text-center bg-primary p-2 rounded-md hover:bg-primary/90 text-white",
                    {
                      "!bg-muted-foreground": card.title !== "Unlimited Saas",
                    }
                  )}
                >
                  Get started
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
