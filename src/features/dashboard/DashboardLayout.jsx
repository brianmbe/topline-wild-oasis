/* eslint-disable react/no-unescaped-entities */
import styled from "styled-components";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

export default function DashboardLayout() {
  return (
    <StyledDashboardLayout>
      <div>Stats</div>
      <div>Today's activity</div>
      <div>charts stay durations</div>
      <div>charts sales</div>
    </StyledDashboardLayout>
  );
}
