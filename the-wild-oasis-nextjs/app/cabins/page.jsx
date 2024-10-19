import CabinCard from "../_components/CabinCard";
import Heading from "../_components/Heading";

export const metadata = {
  title: "Cabins",
};

export default async function Cabins() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  const cabins = [];

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

      {cabins.length > 0 && (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
          {cabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
          ))}
        </div>
      )}
    </div>
  );
}
