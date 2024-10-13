import CabinTable from "../features/cabins/CabinTable";
import AddCabin from "../features/cabins/AddCabin";

import Row from "../ui/Row";
import Heading from "../ui/Heading";
import CabinTableOperations from "../features/cabins/CabinTableOperations";

export default function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as={"h1"}>All Cabins</Heading>
        <CabinTableOperations />
      </Row>

      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
    </>
  );
}
