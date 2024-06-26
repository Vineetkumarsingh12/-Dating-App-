import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import   {Toaster} from 'react-hot-toast';



const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
 
  title: "chating app",
  description: "created by vineet",
 
  };



export default function RootLayout({
  children, 
}: Readonly<{
  children: React.ReactNode,
 
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="./favicon.ico" sizes="any" />
      <body className={inter.className}>
  <StoreProvider>

{children}
</StoreProvider>
<Toaster/>
        </body>
    </html>
  );
}
