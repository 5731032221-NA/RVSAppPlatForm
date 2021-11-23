import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "6",
    Mobile: 4000,
    Desktop: 2400,
    amt: 2400,
  },
  {
    name: "9",
    Mobile: 3000,
    Desktop: 1398,
    amt: 2210,
  },
  {
    name: "12",
    Mobile: 2000,
    Desktop: 9800,
    amt: 2290,
  },
  {
    name: "3",
    Mobile: 2780,
    Desktop: 3908,
    amt: 2000,
  },
  {
    name: "6",
    Mobile: 1890,
    Desktop: 4800,
    amt: 2181,
  },
  {
    name: "9",
    Mobile: 2390,
    Desktop: 3800,
    amt: 2500,
  },
  {
    name: "12",
    Mobile: 3490,
    Desktop: 4300,
    amt: 2100,
  },
];

export default function ArrivalBarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        barSize={20}
      >
        <XAxis dataKey="name" />
        <Tooltip />
        <Bar
          dataKey="Desktop"
          stackId="a"
          fill="#2D62ED"
          radius={5}
          background={{ fill: "#eee" }}
        />
        <Bar dataKey="Mobile" stackId="a" fill="#D8D8D8" radius={5} />
      </BarChart>
    </ResponsiveContainer>
  );
}
