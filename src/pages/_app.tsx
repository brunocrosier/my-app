import { ThemeProvider } from "@/components/ThemeProvider/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle/ThemeToggle";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
import { Inter as FontSans } from "next/font/google";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      <div
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        {/* <ThemeToggle /> */}
        <Component {...pageProps} />
      </div>
    </ThemeProvider>
  );
}
