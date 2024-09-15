import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";

import Row from "../ui/Row";
import Heading from "../ui/Heading";

export default function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as={"h1"}>All Cabins</Heading>
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}
