import { Josefin_Sans } from "next/font/google";
import "@/app/_styles/globals.css";

import Header from "./_components/Header";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "The Wild Oasis | %s",
    default: "Welcome | The Wild Oasis",
  },
  description:
    "Experience Nature Right From The Go With Luxurious Cabins surrounded By Beautiful Hotels & Cabins All-Over The Mountains!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} relative flex flex-col antialiased bg-primary-900 text-primary-50 min-h-screen`}
      >
        <Header />

        <div className="grid flex-1 px-8 py-12">
          <main className="max-w-7xl mx-auto w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
