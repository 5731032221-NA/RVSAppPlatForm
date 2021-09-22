import React from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "M",
    Day: 1500,
    amt: 2400,
    fill: "#21C5FB",
  },
  {
    name: "T",
    Day: 3000,
    amt: 2210,
    fill: "#0F5BFF",
  },
  {
    name: "W",
    Day: 2000,
    amt: 2290,
    fill: "#0F5BFF",
  },
  {
    name: "Th",
    Day: 2780,
    amt: 2000,
    fill: "#0F5BFF",
  },
  {
    name: "F",
    Day: 1890,
    amt: 2181,
    fill: "#0F5BFF",
  },
  {
    name: "S",
    Day: 2390,
    amt: 2500,
    fill: "#0F5BFF",
  },
  {
    name: "Su",
    Day: 1000,
    amt: 2100,
    fill: "#FF0F0F",
  },
];

export default function TodayPickupBarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={500} height={300} data={data} barSize={27}>
        <XAxis dataKey="name" />
        <Tooltip />
        <Bar dataKey="Day" radius={3} background />
      </BarChart>
    </ResponsiveContainer>
  );
}
