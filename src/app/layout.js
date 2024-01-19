import "../styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Inter, Libre_Baskerville } from "next/font/google";
import { PrismicPreview } from "@prismicio/next";
import { repositoryName } from "@/prismicio";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const libre_baskerville = Libre_Baskerville({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["400", "700"],
  variable: "--libre-baskerville",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.className} ${libre_baskerville.className}`}
    >
      <UserProvider>
        <body className="overflow-x-hidden antialiased mt-24">
          <main>
            {children}
            <Analytics />
            <PrismicPreview repositoryName={repositoryName} />
          </main>
        </body>
      </UserProvider>
    </html>
  );
}
