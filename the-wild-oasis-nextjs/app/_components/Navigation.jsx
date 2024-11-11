"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navigation() {
  const pathName = usePathname();

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className={`hover:text-accent-400 transition-colors ${
              pathName === "/cabins"
                ? "text-accent-400 bg-primary-800 p-3 rounded-md"
                : ""
            }`}
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className={`hover:text-accent-400 transition-colors ${
              pathName === "/about"
                ? "text-accent-400 bg-primary-800 p-3 rounded-md"
                : ""
            }`}
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/account"
            className={`hover:text-accent-400 transition-colors ${
              pathName === "/account" ||
              pathName === "/account/reservations" ||
              pathName === "/account/profile"
                ? "text-accent-400 bg-primary-800 p-3 rounded-md"
                : ""
            }`}
          >
            Guest area
          </Link>
        </li>
      </ul>
    </nav>
  );
}
