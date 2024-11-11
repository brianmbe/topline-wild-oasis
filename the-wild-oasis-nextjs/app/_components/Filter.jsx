"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  function handleFilter(filter) {
    // using the webAPI
    const params = new URLSearchParams(searchParams);
    if (filter === "all") {
      params.delete("capacity");
    } else {
      params.set("capacity", filter);
    }
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  function isActiveFilter(filter) {
    return (
      searchParams.get("capacity") === filter ||
      (!searchParams.get("capacity") && filter === "all")
    );
  }

  return (
    <div className="flex border border-primary-800">
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          isActiveFilter("all") ? "bg-primary-600 text-white" : ""
        }`}
        onClick={() => handleFilter("all")}
      >
        All Cabins
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          isActiveFilter("small") ? "bg-primary-600 text-white" : ""
        }`}
        onClick={() => handleFilter("small")}
      >
        1&mdash;3 Guests
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          isActiveFilter("medium") ? "bg-primary-600 text-white" : ""
        }`}
        onClick={() => handleFilter("medium")}
      >
        4&mdash;8 Guests
      </button>
      <button
        className={`px-5 py-2 hover:bg-primary-700 ${
          isActiveFilter("large") ? "bg-primary-600 text-white" : ""
        }`}
        onClick={() => handleFilter("large")}
      >
        8&mdash;12 Guests
      </button>
    </div>
  );
}
