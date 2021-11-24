import React from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "6",
    Cashflow: 4000,
    Income: 2400,
    Revenue: 4000,
    amt: 2400,
  },
  {
    name: "9",
    Cashflow: 3000,
    Income: 1398,
    Revenue: 3000,
    amt: 2210,
  },
  {
    name: "12",
    Cashflow: 2000,
    Income: 9800,
    Revenue: 2300,
    amt: 2290,
  },
  {
    name: "3",
    Cashflow: 2780,
    Income: 3908,
    Revenue: 5000,
    amt: 2000,
  },
  {
    name: "6",
    Cashflow: 1890,
    Income: 4800,
    Revenue: 3000,
    amt: 2181,
  },
  {
    name: "9",
    Cashflow: 2390,
    Income: 3800,
    Revenue: 2500,
    amt: 2500,
  },
  {
    name: "12",
    Cashflow: 3490,
    Income: 4300,
    Revenue: 4500,
    amt: 2100,
  },
];

export default function InHouseBarChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart width={500} height={300} data={data} barSize={27}>
        <XAxis dataKey="name" />
        <Tooltip />
        <Bar dataKey="Income" stackId="a" fill="#2D62ED" radius={3} />
        <Bar dataKey="Cashflow" stackId="a" fill="#21C5FB" radius={3} />
        <Bar dataKey="Revenue" stackId="a" fill="#D8D8D8" radius={3} />
      </BarChart>
    </ResponsiveContainer>
  );
}
