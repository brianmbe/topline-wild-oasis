import { useEffect } from "react";

import { getCabins } from "../services/apiCabins";

import Row from "../ui/Row";
import Heading from "../ui/Heading";

export default function Cabins() {
  useEffect(() => {
    getCabins().then((data) => console.log(data));
  }, []);
  return (
    <Row type="horizontal">
      <Heading as={"h1"}>All Cabins</Heading>
      <p>TEST</p>

      <img
        src="https://ptlkicteoasvoqvuwcgz.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg"
        alt="cabin-001"
      />
    </Row>
  );
}
