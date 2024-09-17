import styled from "styled-components";
import Filter from "../../ui/Filter";

const TableOperations = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

export default function CabinTableOperations() {
  return (
    <>
      <TableOperations>
        <Filter
          filterField="discount"
          options={[
            { value: "all", label: "all" },
            { value: "no-discount", label: "no discount" },
            { value: "with-discount", label: "with discount" },
          ]}
        />
      </TableOperations>
    </>
  );
}
