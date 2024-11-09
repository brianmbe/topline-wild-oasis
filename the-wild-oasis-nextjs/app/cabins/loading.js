"use client";

import Spinner from "@/app/_components/Spinner";
import { ColorRing } from "react-loader-spinner";

export default function loading() {
  return (
    <div className="grid items-center justify-center">
      <Spinner />
      <p className={"text-xl text-primary-200"}>Loading cabins.........</p>
    </div>
  );
}
