/* eslint-disable react/prop-types */
import { useSearchParams } from "react-router-dom";
import Select from "./Select";

export default function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get("sortby") || "";

  function handSortChange(e) {
    searchParams.set("sortby", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <div>
      <Select
        options={options}
        type="white"
        value={sortBy}
        onChange={handSortChange}
      />
    </div>
  );
}
