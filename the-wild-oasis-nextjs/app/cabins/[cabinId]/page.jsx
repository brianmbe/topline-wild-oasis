import Cabin from "@/app/_components/Cabin";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

// Dynamic Metadata
export async function generateMetadata({ params }) {
  try {
    const { name: cabinName } = await getCabin(params.cabinId);
    return {
      title: `Cabin ${cabinName}`,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Cabin Details",
    };
  }
}

// Generating static params (SSG)
export async function generateStaticParams() {
  try {
    const cabins = await getCabins();
    return cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function Page({ params }) {
  let cabin;

  try {
    cabin = await getCabin(params.cabinId);
  } catch (error) {
    console.error("Error fetching cabin data:", error);
    return (
      <div className="max-w-6xl mx-auto mt-8 text-center">
        <p className="text-2xl text-red-500">Unable to load cabin details.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
