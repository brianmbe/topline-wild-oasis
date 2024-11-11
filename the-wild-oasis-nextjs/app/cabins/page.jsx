import { Suspense } from "react";

import CabinList from "../_components/CabinList";
import Heading from "../_components/Heading";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";

// revalidation with Cache
// export const revalidate = 15;

export const metadata = {
  title: "Cabins",
};

export default function Cabins({ searchParms }) {
  const filter = searchParms?.capacity ?? "all";

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

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}
