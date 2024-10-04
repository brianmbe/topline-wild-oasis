/* eslint-disable react/prop-types */
import styled from "styled-components";

import { useDarkMode } from "../../../src/context/DarkModeContext";

import DashboardBox from "./DashboardBox";
import Heading from "../../ui/Heading";
import {
  Area,
  AreaChart,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { eachDayOfInterval } from "date-fns/eachDayOfInterval";
import { isSameDay, subDays } from "date-fns";
import { format } from "date-fns/format";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

// const fakeData = [
//   { label: "Jan 09", totalSales: 480, extraPrice: 20 },
//   { label: "Jan 10", totalSales: 580, extraPrice: 100 },
//   { label: "Jan 11", totalSales: 550, extraPrice: 150 },
//   { label: "Jan 12", totalSales: 600, extraPrice: 50 },
//   { label: "Jan 13", totalSales: 700, extraPrice: 150 },
//   { label: "Jan 14", totalSales: 800, extraPrice: 150 },
//   { label: "Jan 15", totalSales: 700, extraPrice: 200 },
//   { label: "Jan 16", totalSales: 650, extraPrice: 200 },
//   { label: "Jan 17", totalSales: 600, extraPrice: 300 },
//   { label: "Jan 18", totalSales: 550, extraPrice: 100 },
//   { label: "Jan 19", totalSales: 700, extraPrice: 100 },
//   { label: "Jan 20", totalSales: 800, extraPrice: 200 },
//   { label: "Jan 21", totalSales: 700, extraPrice: 100 },
//   { label: "Jan 22", totalSales: 810, extraPrice: 50 },
//   { label: "Jan 23", totalSales: 950, extraPrice: 250 },
//   { label: "Jan 24", totalSales: 970, extraPrice: 100 },
//   { label: "Jan 25", totalSales: 900, extraPrice: 200 },
//   { label: "Jan 26", totalSales: 950, extraPrice: 300 },
//   { label: "Jan 27", totalSales: 850, extraPrice: 200 },
//   { label: "Jan 28", totalSales: 900, extraPrice: 100 },
//   { label: "Jan 29", totalSales: 800, extraPrice: 300 },
//   { label: "Jan 30", totalSales: 950, extraPrice: 200 },
//   { label: "Jan 31", totalSales: 1100, extraPrice: 300 },
//   { label: "Feb 01", totalSales: 1200, extraPrice: 400 },
//   { label: "Feb 02", totalSales: 1250, extraPrice: 300 },
//   { label: "Feb 03", totalSales: 1400, extraPrice: 450 },
//   { label: "Feb 04", totalSales: 1500, extraPrice: 500 },
//   { label: "Feb 05", totalSales: 1400, extraPrice: 600 },
//   { label: "Feb 06", totalSales: 1450, extraPrice: 400 },
// ];

export default function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        ?.filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extraPrice: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extraPrice, 0),
    };
  });

  console.log(data);

  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extraPrice: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extraPrice: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };

  return (
    <StyledSalesChart>
      <Heading as="h2">Sales</Heading>

      <ResponsiveContainer height={250} width={"100%"}>
        <AreaChart data={data}>
          <XAxis
            dataKey="label"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis unit="Ugx" />
          <CartesianGrid strokeDasharray="4" />
          <Tooltip contentStyle={{ background: colors.background }} />
          <Area
            dataKey="totalSales"
            type="monotone"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            strokeWidth={2}
            name="Total Sales"
            unit="Ugx"
          />
          <Area
            dataKey="extraPrice"
            type="monotone"
            stroke={colors.extraPrice.stroke}
            fill={colors.extraPrice.fill}
            strokeWidth={2}
            name="Extra Sales"
            unit="Ugx"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}