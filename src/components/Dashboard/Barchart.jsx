import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Page A",
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    pv: 3500,
    amt: 2210,
  },
  {
    name: "Page C",
    pv: 8000,
    amt: 2290,
  },
  {
    name: "Page D",
    pv: 5000,
    amt: 2000,
  },
  {
    name: "Page E",
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    pv: 3000,
    amt: 2100,
  },
];

export default function Barchart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        // margin={{
        //   top: 5,
        //   right: 30,
        //   left: 20,
        //   bottom: 5,
        // }}
      >
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        {/* <XAxis dataKey="name" />
        <YAxis /> */}
        <Tooltip />
        {/* <Legend /> */}
        <Bar
          dataKey="pv"
          fill="#2D62ED"
          background={{ fill: "#eee" }}
          radius={5}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
