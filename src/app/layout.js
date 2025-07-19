import { DM_Sans, Roboto } from "next/font/google";
import "./globals.css";
import Providers from "@/lib/Providers";
import Script from "next/script";
import "@splidejs/react-splide/css";
import { AdminProfileProvider } from "@/context/adminProfileContext";
import { Toaster } from "react-hot-toast";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700", "900"],
  display: "block",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Glimm Catcher",
    template: "%s - Glimm Catcher",
  },
  description:
    "Admin Dashboard for Glimm Catcher - Find your missing puzzle piece 💝😍. Find your missing one and share your passions, quirks, and everything in between. Your exciting adventure starts here! 😉",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />

        <Script src="/scripts/lang-config.js" strategy="beforeInteractive" />
        <Script src="/scripts/translation.js" strategy="beforeInteractive" />
        <Script
          src="//translate.google.com/translate_a/element.js?cb=TranslateInit"
          strategy="afterInteractive"
        />
      </head>

      <body
        className={`${dmSans.className} ${roboto.variable} box-border antialiased`}
      >
        <Providers>
          <AdminProfileProvider>{children}</AdminProfileProvider>
        </Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
