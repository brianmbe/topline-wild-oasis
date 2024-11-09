import { Suspense } from "react";

import CabinList from "../_components/CabinList";
import Heading from "../_components/Heading";
import Spinner from "../_components/Spinner";

export const metadata = {
  title: "Cabins",
};

export default function Cabins() {
  // const res = await fetch("https://jsonplaceholder.typicode.com/users");
  // const data = await res.json();

  return (
    <div>
      <Heading heading={"Our Luxury Cabins"} />
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <Suspense fallback={<Spinner />}>
        <CabinList />
      </Suspense>
    </div>
  );
}
