import Image from "next/image";
import { Inter } from "next/font/google";
import { Reactions } from "@/components/Reactions/Reactions";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Reactions />
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed items-center left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Try adding a new comment by holding the
          <code className="font-mono font-bold mx-4 px-4 py-2 rounded-md bg-secondary">
            Cmd
          </code>
          key and clicking anywhere
        </p>
      </div>
    </main>
  );
}
